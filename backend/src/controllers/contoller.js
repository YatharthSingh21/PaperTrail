import express from "express";
import { ObjectId } from 'mongodb';
import { getDB } from "../DB/connection.js";

export async function getStudents(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const sortBy = req.query.sortBy || "name"; // default sort field
        const order = parseInt(req.query.order) || 1;

        const db = getDB();
        const students = await db.collection("teachers")
            .find()
            .sort({ [sortBy]: order })
            .skip((page - 1) * limit)
            .limit(limit)
            .toArray();

        console.log("Displayed successfully");
        res.json(students);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching students");
    }
}

function getAllTeachers(req, res){
    const db = getDB();
    db.collection("teachers")
      .find()
      .toArray()
      .then(teachers => {
          console.log(teachers);
          res.json(teachers);
      })
      .catch(err => {
          console.error(err);
          res.status(500).send("Error fetching teachers");
      });
}

async function postTeacher(req, res){
    try {
        const db = getDB();
        const obj = req.body;

        await db.collection("teachers").insertOne({
            name: obj.name,
            subject: obj.subject,
            experience: obj.experience
        });

        console.log("Inserted successfully");
        res.status(201).send("Teacher inserted successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error inserting teacher");
    }
}

async function getSubjectTeacher(req, res) {
    const sub = req.query.subject;
    const db = getDB();
    db.collection("teachers").find({ subject: sub }).toArray()
    .then(teachers => {
          console.log(teachers);
          res.json(teachers);
      })
      .catch(err => {
          console.error(err);
          res.status(500).send("Error fetching teachers");
      });
}

async function updateExp(req, res) {
    try {
        const id = req.params.id;
        const exp = req.body.experience;
        
        if (!id || !exp) {
            return res.status(400).send("Both ID and experience are required");
        }

        const db = getDB();
        const result = await db.collection("teachers").updateOne(
            { _id: new ObjectId(id) }, // Use _id instead of id, and convert to ObjectId
            { $set: { experience: exp } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).send("Teacher not found or data unchanged");
        }

        res.send("Updated Successfully");
    } catch (err) { // Fixed variable name from error to err
        console.error(err);
        res.status(500).send("Error updating teacher"); // Fixed error message
    }
}

export {getAllTeachers, postTeacher, getSubjectTeacher, updateExp};