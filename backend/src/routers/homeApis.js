import express from "express";
import { getAllPaper, postPaper, getPaperByID } from "../controllers/homeControllers";

const router = express.Router();

router.get("/", getAllPaper);
router.post("/", postPaper);
router.get("/:id", getPaperByID);
