import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

// ✅ Fix: Return type is void (use early return)
export const authenticateJWT: RequestHandler = (req, res, next): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "No token provided" });
    return; // 🛠 return void here
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;
    next(); // ✅ proceed
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
    return;
  }
};
