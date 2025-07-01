import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";


// load env vars
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5020;

// middleware
app.use(cors());
app.use(express.json());

// simple test route
app.get("/", (_req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
