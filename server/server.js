import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// ✅ Allowed origins (VERY IMPORTANT)
const allowedOrigins = [
  "http://localhost:5173",
  "https://quick-gpt-o6ef.vercel.app"
];

// ✅ CORS (must be at TOP)
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// ✅ Fix preflight (YOUR ERROR FIX)
app.options("*", cors());

// middlewares
app.use(express.json());
app.use(cookieParser());

// routes
app.post("/api/user/register", (req, res) => {
  res.json({ success: true, message: "Registered successfully" });
});

app.get("/", (req, res) => {
  res.send("API working 🚀");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));