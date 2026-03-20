import express, { Express } from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import contentRoutes from "./routes/contentRoutes";
import brainRoutes from "./routes/brainRoutes";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/brain", brainRoutes);

export default app;
