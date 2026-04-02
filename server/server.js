import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// 🔥 FIXED CORS
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