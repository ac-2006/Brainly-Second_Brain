import jwt from "jsonwebtoken";
import crypto from "crypto";

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || "your-secret-key", {
    expiresIn: "30d",
  });
};

export const generateShareLink = (): string => {
  return crypto.randomBytes(16).toString("hex");
};
