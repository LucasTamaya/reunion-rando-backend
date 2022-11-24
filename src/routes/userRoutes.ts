import express, { Router } from "express";

import { getUserRoleController } from "../controllers/userControllers";
import { jwtAuth } from "../middleware/jwtAuth";

export const router: Router = express.Router();

router.get("/user/role", jwtAuth, getUserRoleController);
