import express from "express";
import {getAllTeachers, postTeacher, getSubjectTeacher, updateExp, getStudents} from "../controllers/contoller.js";

const router = express.Router();

router.get("/teachers", getStudents);
router.get("/", getAllTeachers);
router.post("/", postTeacher);
router.get("/search", getSubjectTeacher);
router.patch("/teacher/:id", updateExp)


export default router;

















// //Get Particular article
// router.get("/:id", (req, res)=>{

// });

// //Updation and deletion would probably done in profile
// // router.put("/:id", (req, res)=>{
// // });
// // router.delete("/:id", (req, res)=>{
// // });