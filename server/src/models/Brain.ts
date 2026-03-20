import mongoose, { Schema, Document } from "mongoose";

export interface IBrain extends Document {
  userId: string;
  shareLink: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const brainSchema = new Schema<IBrain>(
  {
    userId: {
      type: String,
      required: true,
      ref: "User",
      unique: true,
    },
    shareLink: {
      type: String,
      required: true,
      unique: true,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IBrain>("Brain", brainSchema);
