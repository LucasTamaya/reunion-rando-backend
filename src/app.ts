import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import helmet from "helmet";

import { router as authRoutes } from "./routes/authRoutes";
import { router as userRoutes } from "./routes/userRoutes";
import { router as hikeRoutes } from "./routes/hikeRoutes";
import { router as activityRoutes } from "./routes/activityRoutes";

export const createServer = () => {
  const app = express();

  // server config
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(cors({ credentials: true, origin: "http://127.0.0.1:5173" })); // origin a modifier pour production
  // add 15 small middlewares to protect the app
  app.use(helmet());

  // api routes
  app.use(authRoutes);
  app.use(userRoutes);
  app.use(hikeRoutes);
  app.use(activityRoutes);

  return app;
};
