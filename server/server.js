// 🔥 MUST BE FIRST LINE — NO IMPORT ABOVE THIS
import "dotenv/config";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; // ✅ ADDED
import connectDB from "./configs/db.js";

import userRouter from "./routes/userRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import creditRouter from "./routes/creditRoutes.js";
import { stripeWebhooks } from "./controllers/webhooks.js";



const app = express();

// Connect DB
await connectDB();

// ✅ FIXED CORS (IMPORTANT)
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true
}));

// ✅ ADDED (for cookies)
app.use(cookieParser());

app.use(express.json());

// Stripe webhook (raw body only for this route)
app.post(
  "/api/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhooks
);

// Health check
app.get("/", (req, res) => res.send("Server is Live"));

// Routes
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);
app.use("/api/credit", creditRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});