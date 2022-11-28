import express, { Router } from "express";

import { getHikesController } from "../controllers/hikeControllers";
import { jwtAuth } from "../middleware/jwtAuth";

export const router: Router = express.Router();

router.get("/hikes", jwtAuth, getHikesController);
