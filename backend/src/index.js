import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookiParser from "cookie-parser";
import path from "path";

import dbConnection from "./config/db.js";
import userRouter from "./routes/user.route.js";
import taskRouter from "./routes/task.route.js";

dotenv.config();
const app = express();
await dbConnection();
const PORT = process.env.PORT || 4001;
const __dirname = path.resolve();

// --- middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiParser());

// --- routes
app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);

// Serving frontend
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(distPath));
  app.get("/*path", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
