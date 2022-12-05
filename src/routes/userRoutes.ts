import express, { Router } from "express";

import {
  getUserRoleController,
  getAllProviderUsersController,
} from "../controllers/userControllers";
import { jwtAuth } from "../middleware/jwtAuth";

export const router: Router = express.Router();

router.get("/user/role", jwtAuth, getUserRoleController);
router.get("/users/prestataire", getAllProviderUsersController);
