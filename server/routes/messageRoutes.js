import express from "express";
import auth from "../middlewares/auth.js";
import {
  textMessageController,
  imageMessageController,
} from "../controllers/messageController.js";

const router = express.Router();

router.post("/text", auth, textMessageController);
router.post("/image", auth, imageMessageController);

export default router;

