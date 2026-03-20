import { Router } from "express";
import {
  getShareLink,
  getPublicBrain,
  toggleBrainPublic,
} from "../controllers/brainController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/share-link", authMiddleware, getShareLink);
router.post("/toggle-public", authMiddleware, toggleBrainPublic);
router.get("/public/:shareLink", getPublicBrain);

export default router;
