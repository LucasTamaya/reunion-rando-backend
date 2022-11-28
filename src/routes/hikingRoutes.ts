import express, { Router } from "express";

import { addHikeController } from "../controllers/hikeController";

export const router: Router = express.Router();

router.post("/hike/add", addHikeController);
