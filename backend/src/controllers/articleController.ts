import { Request, Response } from "express";
import { getArticles } from "../models/articleModel";

export const fetchArticles = async (req: Request, res: Response): Promise<void> => {
  const membership = req.user?.membership_type;
  const limit = membership === "A" ? 3 : membership === "B" ? 10 : undefined;

  try {
    const articles = await getArticles(limit);
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch articles" });
  }
};
