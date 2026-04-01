import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// ✅ Allowed Origins (IMPORTANT)
const allowedOrigins = [
  "http://localhost:5173",
  "https://quick-gpt-o6ef-g7uc9vbpu-harshit-agrawals-projects-e04e4394.vercel.app"
];

// ✅ CORS Setup
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// ✅ Register Route (example)
app.post("/api/user/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({
      success: false,
      message: "Missing Details",
    });
  }

  return res.json({
    success: true,
    message: "User registered successfully",
  });
});

// ✅ PORT
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});