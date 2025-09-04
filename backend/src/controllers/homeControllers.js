import { ObjectId } from 'mongodb';
import { getDB } from "../DB/connection.js";
import bcrypt from "bcrypt";

export async function toggleGlide(req, res) {
  try {
    const db = getDB();
    const { id } = req.params; // post ID
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const paper = await db.collection("papers").findOne({ _id: new ObjectId(id) });
    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    let updateQuery;

    if (paper.glideUsers.includes(userId)) {
      // User already glided → unglide
      updateQuery = {
        $inc: { glide: -1 },
        $pull: { glideUsers: userId },
      };
    } else {
      // User hasn't glided yet → glide
      updateQuery = {
        $inc: { glide: 1 },
        $addToSet: { glideUsers: userId },
      };
    }

    const updated = await db
      .collection("papers")
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        updateQuery,
        { returnDocument: "after" }
      );

    res.json({ message: "Glide updated", paper: updated });
  } catch (error) {
    console.error("Error toggling glide:", error);
    res.status(500).json({ message: "Error toggling glide", error: error.message });
  }
}

export async function updateProfile(req, res) {
  try {
    const { id } = req.params; // profile being updated
    const { name, bio, profilePic, loggedInUserId } = req.body;
    const db = getDB();

    // Check ID validity
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Check ownership (only allow updating own profile)
    if (id !== loggedInUserId) {
      return res.status(403).json({ message: "You can only update your own profile" });
    }

    // Build update object dynamically
    const updateFields = {};
    if (name !== undefined) updateFields.name = name;
    if (bio !== undefined) updateFields.bio = bio;
    if (profilePic !== undefined) updateFields.profilePic = profilePic;

    const result = await db
      .collection("users")
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updateFields },
        { returnDocument: "after" }
      );

    if (!result.value) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Profile updated successfully",
      user: result.value,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error: error.message });
  }
}

export async function getUser(req, res){
    try {
        const id = req.params.id;
        const db = getDB();

        // Validate ID
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }

        const user = await db.collection("users").findOne({ _id: new ObjectId(id) });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);

    } catch (error) {
        res.status(500).json({ message: "Error fetching User", error: error.message });
    }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const db = getDB();

    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.json({ message: "Login successful", user: { _id: user._id, name: user.name, bio: user.bio, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
}

export async function postUser(req, res) {
  try {
    const db = getDB();
    const { name, bio, email, password, profilePic } = req.body;

    // Check if user already exists
    const existing = await db.collection("users").findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Use default if no profilePic provided
    const finalProfilePic =
      profilePic || "https://tse4.mm.bing.net/th/id/OIP.PnA78VPdcpzB-eu8gNPy7wHaJt?pid=Api";

    const newUser = {
      name,
      bio,
      email,
      password: hashedPassword,
      profilePic: finalProfilePic,
    };

    const result = await db.collection("users").insertOne(newUser);

    res.status(201).json({
      message: "User added successfully",
      user: {
        _id: result.insertedId,
        name,
        bio,
        email,
        profilePic: finalProfilePic,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error posting user", error: error.message });
  }
}

export async function getAllPaper(req, res) {
    try {
        const db = getDB();

        //For Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = 8;
        const sortBy = ["glide", "fall", "createdAt", "title"].includes(req.query.sortBy) ? req.query.sortBy : "glide";
        const order = parseInt(req.query.order) || -1;

        // Filtering
        const tag = req.query.tags ? req.query.tags.split(",") : null;
        const search = req.query.search ? req.query.search.trim() : null;

        let filter = {};
        if (tag) {
            filter.tags = { $in: tag };
        }
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { content: { $regex: search, $options: "i" } },
                { author: { $regex: search, $options: "i" } }
            ];
        }

        // Total count for pagination
        const total = await db.collection("papers").countDocuments(filter);

        // Fetch data
        const papers = await db.collection("papers")
            .find(filter)
            .sort({ [sortBy]: order })
            .skip((page - 1) * limit)
            .limit(limit)
            .toArray();

        res.json({
            papers,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            totalResults: total
        });

    } catch (error) {
        res.status(500).json({ message: "Error fetching papers", error: error.message });
    }
}

export async function postPaper(req, res) {
  try {
    const body = req.body;
    const db = getDB();

    if (!body.title || !body.content || !body.author) {
      return res
        .status(400)
        .json({ message: "Title, content, and author are required" });
    }

    // Make sure author has both id and name
    if (typeof body.author !== "object" || !body.author._id || !body.author.name) {
      return res
        .status(400)
        .json({ message: "Author must include _id and name" });
    }

    let tagsArray = [];
    if (Array.isArray(body.tags)) {
      tagsArray = body.tags;
    } else if (typeof body.tags === "string" && body.tags.trim() !== "") {
      tagsArray = body.tags.split(",").map((tag) => tag.trim());
    }

    const newPaper = {
      title: body.title,
      subTitle: body.subTitle,
      content: body.content,
      author: {
        _id: body.author._id,
        name: body.author.name,
      },
      tags: tagsArray,
      comments: [],
      glide: 0,
      glideUsers: [],
      createdAt: new Date(),
    };

    await db.collection("papers").insertOne(newPaper);

    res
      .status(201)
      .json({ message: "Paper posted successfully", paper: newPaper });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error posting paper", error: error.message });
  }
}

export async function getPaperByID(req, res) {
    try {
        const id = req.params.id;
        const db = getDB();

        // Validate ID
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid paper ID" });
        }

        const paper = await db.collection("papers").findOne({ _id: new ObjectId(id) });
        if (!paper) {
            return res.status(404).json({ message: "Paper not found" });
        }

        res.json(paper);

    } catch (error) {
        res.status(500).json({ message: "Error fetching paper", error: error.message });
    }
}

export async function removePaper(req, res) {
  try {
    const { id } = req.params;  // paper id from URL
    const { loggedInUserId } = req.body; // user trying to delete

    if (!loggedInUserId) {
      return res.status(401).json({ message: "Login required" });
    }

    const db = getDB();
    const paper = await db.collection("papers").findOne({ _id: new ObjectId(id) });

    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    // ✅ Check ownership (paper.author could be object {_id, name})
    if (paper.author._id.toString() !== loggedInUserId.toString()) {
      return res.status(403).json({ message: "You are not allowed to delete this paper" });
    }

    await db.collection("papers").deleteOne({ _id: new ObjectId(id) });

    return res.status(200).json({ message: "Paper deleted successfully" });

  } catch (error) {
    console.error("Error deleting paper:", error);
    res.status(500).json({ message: "Error deleting paper", error: error.message });
  }
}