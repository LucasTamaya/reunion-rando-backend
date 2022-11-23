import express from "express";
import cors from "cors";

import { router as authRoutes } from "./routes/authRoutes";

export const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors({ credentials: true, origin: "http://127.0.0.1:5173" })); // origin a modifier pour production

  app.use(authRoutes);

  return app;
};
