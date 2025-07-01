import { Request, Response } from "express";
import { getVideos } from "../models/videoModel";
import { AuthRequest } from "../types";

export const fetchVideos = async (req: AuthRequest, res: Response) => {
  const membership = req?.user?.membership_type;
  const limit = membership === "A" ? 3 : membership === "B" ? 10 : undefined;

  try {
    const videos = await getVideos(limit);
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch videos" });
  }
};
