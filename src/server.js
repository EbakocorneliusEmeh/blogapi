import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

import { createTables } from "../src/db/createTables.js"; 

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

//  Welcome route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Blog API! "
  });
});

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/", commentRoutes);
app.use("/", uploadRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 4000;

// Start server only after tables are created
const startServer = async () => {
  try {
    await createTables(); // create tables if they don't exist
    console.log("Tables ensured. Starting server...");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log("Welcome! Your Blog API is live at /");
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startServer();
