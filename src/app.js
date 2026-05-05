import express from "express";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import { searchController } from "./controllers/post.controller.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { createTables } from "./db/createTables.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 120,
  message: { error: "Too many requests, try again later." }
});

app.use(limiter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Blog API!"
  });
});

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/posts", postRoutes);
app.use("/", commentRoutes);

app.get("/search", searchController);

app.use(errorHandler);

export const tablesReady = createTables().catch((err) => {
  console.error("Failed to ensure database tables:", err.message);
});

export default app;
