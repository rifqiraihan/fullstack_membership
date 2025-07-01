import express from "express";
import { fetchVideos } from "../controllers/videoController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authenticateJWT, fetchVideos);

export default router;
