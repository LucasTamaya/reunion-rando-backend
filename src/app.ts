import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { router as authRoutes } from "./routes/authRoutes";
import { router as userRoutes } from "./routes/userRoutes";
import { router as activityRoutes } from "./routes/hikeRoutes";

export const createServer = () => {
  const app = express();

  // server config
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors({ credentials: true, origin: "http://127.0.0.1:5173" })); // origin a modifier pour production

  // api routes
  app.use(authRoutes);
  app.use(userRoutes);
  app.use(activityRoutes);

  return app;
};
