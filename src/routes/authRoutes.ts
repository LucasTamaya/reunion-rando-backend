import express, { Router } from "express";

import { RegisterController } from "../controllers/authControllers";

export const router: Router = express.Router();

router.post("/register", RegisterController);