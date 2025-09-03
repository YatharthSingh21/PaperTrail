import express from "express";
import { getAllPaper, postPaper, getPaperByID, loginUser, postUser, getUser, updateProfile, toggleGlide } from "../controllers/homeControllers.js";

const router = express.Router();

router.get("/", getAllPaper);
router.post("/", postPaper);
router.put("/:id/glide", toggleGlide);
router.get("/:id", getPaperByID);

//Signup APIs
router.post("/user/signup", postUser);
router.post("/user/login", loginUser); //Use post method for secure access
router.get("/user/:id", getUser);
router.put("/user/:id", updateProfile);

export default router;
