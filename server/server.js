import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// ✅ CORS (handles localhost + all vercel domains)
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (origin.includes("localhost") || origin.includes("vercel.app")) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

// ✅ FIX PRE-FLIGHT (MOST IMPORTANT)
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  return res.sendStatus(200);
});

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.get("/", (req, res) => {
  res.send("API working 🚀");
});

app.post("/api/user/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({
      success: false,
      message: "Missing Details"
    });
  }

  return res.json({
    success: true,
    message: "Registered successfully"
  });
});

// ✅ Server start
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});