import { Request, Response } from "express";

import { getAllProviderUsers, getUserData } from "../services/userServices";
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

export const getUserDataController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const userData = await getUserData(id);

    if (!userData) {
      return res.sendStatus(404);
    }

    return res.status(200).json({ userData });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
