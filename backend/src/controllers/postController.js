import { ObjectId, Timestamp } from 'mongodb';
import { getDB } from "../DB/connection.js";

export async function postComment(req, res) {
    try {
        const db = getDB();
        const comment = req.body.comment;
        const newComment = {
            author: req.body.author,
            content: comment,
            timestamp: new Date(),
        }
        db.collection("papers").insertOne();
    } catch (error) {
        
    }
}