import express from "express";
import auth from "../middlewares/auth.js";
import { createChat, getChats, deleteChat } from "../controllers/chatController.js";

const chatRouter = express.Router();

chatRouter.get("/create", auth, createChat);
chatRouter.get("/", auth, getChats);
chatRouter.delete("/delete", auth, deleteChat);

export default chatRouter;
