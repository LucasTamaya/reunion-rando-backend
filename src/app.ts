import express from "express";
import cors from "cors";

import { router as authRoutes } from "./routes/authRoutes";

export const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(authRoutes);

  return app;
};
