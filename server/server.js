import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// ✅ SIMPLE & GUARANTEED CORS FIX
app.use(cors({
  origin: true,
  credentials: true
}));

// ✅ HANDLE PREFLIGHT (VERY IMPORTANT)
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.get("/", (req, res) => {
  res.send("API working 🚀");
});

app.post("/api/user/register", (req, res) => {
  res.json({ success: true, message: "Registered successfully" });
});

// ✅ Server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});