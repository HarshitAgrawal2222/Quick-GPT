import express from "express";
import auth from "../middlewares/auth.js";
import {
  getPlans,
  purchasePlan,
} from "../controllers/creditController.js";

const router = express.Router();

router.get("/plans", getPlans);
router.post("/purchase", auth, purchasePlan);

export default router;
