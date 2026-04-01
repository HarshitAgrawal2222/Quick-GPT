import express from "express";
import { createChat, getUserChats } from "../controllers/chatController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", auth, createChat);
router.get("/user", auth, getUserChats);

export default router;
