import { Request, Response } from "express";

import { getUserByEmail, saveNewUser } from "../services/userServices";
import { UserModel } from "../types/index";

export const RegisterController = async (req: Request, res: Response) => {
  try {
    const body: UserModel = req.body;

    const user = await getUserByEmail(body.email);

    if (user) {
      return res
        .status(200)
        .json({ isError: true, message: "L'utilisateur existe déjà" });
    } else {
      const newUser = await saveNewUser(body);

      return res.status(200).json({ isSuccess: true, data: newUser });
    }
  } catch (err: any) {
    console.error(err.message);
    return res.status(500);
  }
};
