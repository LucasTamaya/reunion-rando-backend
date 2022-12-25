import express from "express";
import { getHikesController } from "../controllers/hikeControllers.js";
import { jwtAuth } from "../middleware/jwtAuth.js";
export const router = express.Router();
router.get("/hikes", jwtAuth, getHikesController);
//# sourceMappingURL=hikeRoutes.js.map