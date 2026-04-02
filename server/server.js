import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// ✅ CORS
app.use(cors({
  origin: true,
  credentials: true
}));

// ✅ FIX (instead of app.options)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// middlewares
app.use(express.json());
app.use(cookieParser());

// routes
app.get("/", (req, res) => {
  res.send("API working 🚀");
});

app.post("/api/user/register", (req, res) => {
  res.json({ success: true, message: "Registered successfully" });
});

// server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));