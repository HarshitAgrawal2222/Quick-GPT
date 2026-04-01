// 🔥 MUST BE FIRST LINE — NO IMPORT ABOVE THIS
import "dotenv/config";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./configs/db.js";

import userRouter from "./routes/userRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import creditRouter from "./routes/creditRoutes.js";
import { stripeWebhooks } from "./controllers/webhooks.js";

const app = express();

// Connect DB
await connectDB();

/* ================= CORS FIX ================= */
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend
      "https://quick-gpt-o6ef-mryt3ydpa-harshit-agrawals-projects-e04e4394.vercel.app" // deployed frontend
    ],
    credentials: true,
  })
);

/* ================= MIDDLEWARE ================= */
app.use(cookieParser());
app.use(express.json());

/* ================= STRIPE ================= */
app.post(
  "/api/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhooks
);

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => res.send("Server is Live"));

/* ================= ROUTES ================= */
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);
app.use("/api/credit", creditRouter);

/* ================= SERVER ================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});