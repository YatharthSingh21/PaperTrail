import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI || "";

if (!uri) {
  throw new Error("❌ MONGO_URI not found in .env");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db; // Will hold the connected DB instance

// Connect to MongoDB and set `db`
async function connectDB(dbName = "posts") {
  try {
    await client.connect();

    // Ping to confirm connection
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Pinged your deployment. Connected to MongoDB!");

    db = client.db(dbName);
    return db;
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1); // Exit app if DB fails
  }
}

// Getter function to access DB after connection
function getDB() {
  if (!db) {
    throw new Error("❌ Database not connected yet. Call connectDB() first.");
  }
  return db;
}

export { connectDB, getDB };