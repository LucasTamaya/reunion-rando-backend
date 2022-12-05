import { Request, Response } from "express";

import { getAllProviderUsers } from "../services/userServices";
import { decodeJwtPayload } from "../services/authServices";

export const getUserRoleController = async (req: Request, res: Response) => {
  const token: string = req.cookies.token;

  const { role } = decodeJwtPayload(token);

  return res.status(200).json({ role });
};

export const getAllProviderUsersController = async (
  _: Request,
  res: Response
) => {
  try {
    const providerUsers = await getAllProviderUsers();
    return res.status(200).json({ providerUsers });
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
};
