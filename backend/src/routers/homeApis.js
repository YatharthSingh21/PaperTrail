import express from "express";
import { getAllPaper, postPaper, getPaperByID, loginUser, postUser, getUser, updateProfile, toggleGlide, removePaper } from "../controllers/homeControllers.js";

const router = express.Router();

//Always remember to route order matters, had to face a lot of trouble because of that
// Signup / User APIs
router.post("/user/signup", postUser);
router.post("/user/login", loginUser); 
router.get("/user/:id", getUser);
router.put("/user/:id", updateProfile);

// Paper APIs
router.get("/", getAllPaper);
router.post("/", postPaper);
router.put("/:id/glide", toggleGlide);
router.get("/:id", getPaperByID);
router.delete("/:id", removePaper);

export default router;
