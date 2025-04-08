// backend/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import siteRoutes from "./routes/site.routes.js";
import connectDB from "./config/db.js";
import morgan from "morgan";
import helmet from "helmet";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

// Connect to DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/sites", siteRoutes);

app.get("/", (req, res) => {
  res.send("MEMS API is running ✅");
});

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
