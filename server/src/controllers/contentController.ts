import { Response } from "express";
import Content from "../models/Content";
import { AuthRequest } from "../middleware/auth";
import { getLinkPreview } from "link-preview-js";

export const addContent = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, type, content, tags } = req.body;
    const userId = req.userId;

    if (!title || !type || !content) {
      res.status(400).json({ message: "Title, type, and content are required" });
      return;
    }

    if (!["link", "note"].includes(type)) {
      res.status(400).json({ message: "Invalid content type" });
      return;
    }

    let thumbnail: string | null = null;
    let description: string | null = null;

    if (type === "link") {
      try {
        const preview = await getLinkPreview(content, {
          headers: {
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          },
        });
        thumbnail = (preview as any).image || null;
        description = (preview as any).description || null;
      } catch (err) {
        console.error("Error fetching link preview:", err);
      }
    }

    const newContent = await Content.create({
      userId,
      title,
      type,
      content,
      tags: tags || [],
      thumbnail,
      description,
    });

    res.status(201).json({
      message: "Content added successfully",
      content: newContent,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to add content", error });
  }
};

export const getContent = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;

    const contents = await Content.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Contents retrieved successfully",
      contents,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve contents", error });
  }
};

export const deleteContent = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { contentId } = req.params;
    const userId = req.userId;

    const content = await Content.findById(contentId);
    if (!content) {
      res.status(404).json({ message: "Content not found" });
      return;
    }

    if (content.userId !== userId) {
      res.status(403).json({ message: "Unauthorized to delete this content" });
      return;
    }

    await Content.findByIdAndDelete(contentId);

    res.status(200).json({ message: "Content deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete content", error });
  }
};
