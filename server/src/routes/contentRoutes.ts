import { Router } from "express";
import {
  addContent,
  getContent,
  deleteContent,
} from "../controllers/contentController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/add", authMiddleware, addContent);
router.get("/", authMiddleware, getContent);
router.delete("/:contentId", authMiddleware, deleteContent);

export default router;
