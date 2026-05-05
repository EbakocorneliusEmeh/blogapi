import dotenv from "dotenv";

import app, { tablesReady } from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await tablesReady;
    console.log("Tables ensured. Starting server...");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log("Welcome! Your Blog API is live at /");
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
