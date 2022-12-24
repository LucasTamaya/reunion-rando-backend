import express, { Router } from "express";

import {
  registerController,
  loginController,
  logoutController,
} from "../controllers/authControllers.js";

export const router: Router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);
