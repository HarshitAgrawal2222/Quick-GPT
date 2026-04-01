import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
  getPublishedImages,
} from "../controllers/userController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/data", auth, getUser);
router.get("/published-images", getPublishedImages);

export default router;
