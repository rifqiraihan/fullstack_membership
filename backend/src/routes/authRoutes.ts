import express from "express";
import { register, login } from "../controllers/authController";
import jwt from "jsonwebtoken";
import passport from "passport";


const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "secret";


router.post("/register", register);
router.post("/login", login);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", { session: false }), (req, res) => {
  const user = req.user as any;
  const token = jwt.sign({ id: user.id, membership_type: user.membership_type }, JWT_SECRET, { expiresIn: "7d" });
  res.redirect(`http://localhost:5173/oauth-success?token=${token}`);
});

// --- FACEBOOK ---
router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));

router.get("/facebook/callback", passport.authenticate("facebook", { session: false }), (req, res) => {
  const user = req.user as any;
  const token = jwt.sign({ id: user.id, membership_type: user.membership_type }, JWT_SECRET, { expiresIn: "7d" });
  res.redirect(`http://localhost:5173/oauth-success?token=${token}`);
});


export default router;
