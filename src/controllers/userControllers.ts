import { Request, Response } from "express";

import { decodeJwtPayload } from "../services/authServices";

export const getUserRoleController = async (req: Request, res: Response) => {
  const token: string = req.cookies.token;

  const { role } = decodeJwtPayload(token);

  return res.status(200).json({ role });
};
