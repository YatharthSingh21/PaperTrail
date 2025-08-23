import express from "express";
import { getAllPaper, postPaper, getPaperByID } from "../controllers/homeControllers.js";

const router = express.Router();

router.get("/", getAllPaper);
router.post("/", postPaper);
router.get("/:id", getPaperByID);

export default router;
