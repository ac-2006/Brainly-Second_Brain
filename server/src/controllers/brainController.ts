import { Response, Request } from "express";
import Brain from "../models/Brain";
import Content from "../models/Content";
import User from "../models/User";
import { AuthRequest } from "../middleware/auth";
import { generateShareLink } from "../utils/helpers";

export const getShareLink = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;

    let brain = await Brain.findOne({ userId });

    if (!brain) {
      const shareLink = generateShareLink();
      brain = await Brain.create({
        userId,
        shareLink,
        isPublic: true,
      });
    }

    res.status(200).json({
      message: "Share link retrieved successfully",
      shareLink: brain.shareLink,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to get share link", error });
  }
};

export const getPublicBrain = async (req: Request, res: Response): Promise<void> => {
  try {
    const { shareLink } = req.params;

    const brain = await Brain.findOne({ shareLink, isPublic: true });

    if (!brain) {
      res.status(404).json({ message: "Shared brain not found" });
      return;
    }

    const user = await User.findById(brain.userId);
    const contents = await Content.find({ userId: brain.userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: "Public brain retrieved successfully",
      brain: {
        userId: brain.userId,
        username: user?.username,
        contents,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve shared brain", error });
  }
};

export const toggleBrainPublic = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId;

    let brain = await Brain.findOne({ userId });

    if (!brain) {
      const shareLink = generateShareLink();
      brain = await Brain.create({
        userId,
        shareLink,
        isPublic: false,
      });
    } else {
      brain.isPublic = !brain.isPublic;
      await brain.save();
    }

    res.status(200).json({
      message: "Brain visibility toggled successfully",
      isPublic: brain.isPublic,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to toggle brain visibility", error });
  }
};
