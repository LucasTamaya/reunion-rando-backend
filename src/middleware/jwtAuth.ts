import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    next();
  } catch (err) {
    res.clearCookie("token");
    return res.status(401);
  }
};
