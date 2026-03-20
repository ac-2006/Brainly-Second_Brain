import mongoose, { Schema, Document } from "mongoose";

export interface IContent extends Document {
  userId: string;
  title: string;
  type: "link" | "note";
  content: string;
  tags?: string[];
  thumbnail?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const contentSchema = new Schema<IContent>(
  {
    userId: {
      type: String,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["link", "note"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: [String],
    thumbnail: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IContent>("Content", contentSchema);
