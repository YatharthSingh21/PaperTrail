import { ObjectId } from 'mongodb';
import { getDB } from "../DB/connection.js";

export async function getAllPaper(req, res) {
    try {
        const db = getDB();

        //For Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = 6;
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
            return res.status(400).json({ message: "Title, content, and author are required" });
        }

        let tagsArray = [];
        if (Array.isArray(body.tags)) {
            tagsArray = body.tags;
        } else if (typeof body.tags === "string" && body.tags.trim() !== "") {
            tagsArray = body.tags.split(",").map(tag => tag.trim());
        }

        const newPaper = {
            title: body.title,
            content: body.content,
            author: body.author,
            tags: tagsArray,
            comments: [],
            glide: 0,
            fall: 0,
            createdAt: new Date()
        };

        await db.collection("papers").insertOne(newPaper);

        res.status(201).json({ message: "Paper posted successfully", paper: newPaper });
    } catch (error) {
        res.status(500).json({ message: "Error posting paper", error: error.message });
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