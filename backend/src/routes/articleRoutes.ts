import express from "express";
import { fetchArticles } from "../controllers/articleController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authenticateJWT, fetchArticles);

export default router;
