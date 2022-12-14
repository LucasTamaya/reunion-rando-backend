import express, { Router } from "express";

import { getHikesController } from "../controllers/hikeControllers.js";
import { jwtAuth } from "../middleware/jwtAuth.js";

export const router: Router = express.Router();

router.get("/hikes", jwtAuth, getHikesController);
