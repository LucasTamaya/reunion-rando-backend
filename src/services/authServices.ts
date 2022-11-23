import { Response } from "express";
import jwt from "jsonwebtoken";

import { UserModelWithId } from "../types/index";

export const createJwt = (user: UserModelWithId) => {
  return jwt.sign({ ...user }, process.env.JWT_SECRET!, { expiresIn: "1d" });
};

export const sendJwtToClient = (res: Response, token: string) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    // sameSite: "none"
  });
};
