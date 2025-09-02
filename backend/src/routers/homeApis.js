import express from "express";
import { getAllPaper, postPaper, getPaperByID, loginUser, postUser } from "../controllers/homeControllers.js";

const router = express.Router();

router.get("/", getAllPaper);
router.post("/", postPaper);
router.get("/:id", getPaperByID);

//Signup APIs
router.post("/user/signup", postUser);
router.post("/user/login", loginUser); //Use post method for secure access

export default router;
