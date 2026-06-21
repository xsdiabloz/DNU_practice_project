import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();
const PORT = process.env.PORT || 5001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_PORT || "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log("Server is running");
  });
};

startServer();
