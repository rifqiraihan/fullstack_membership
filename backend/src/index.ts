import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import passport from "./auth/passport";
import session from "express-session";
import articleRoutes from "./routes/articleRoutes";
import videoRoutes from "./routes/videoRoutes";


// load env vars
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5020;

// middleware
app.use(cors());
app.use(express.json());

app.use(
    session({
      secret: "oauth-secret",
      resave: false,
      saveUninitialized: false,
    })
  );
  
  app.use(passport.initialize());
  app.use(passport.session());

// simple test route
app.get("/", (_req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/videos", videoRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
