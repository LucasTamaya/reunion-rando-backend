import { Request, Response } from "express";

import { getUserByEmail, saveNewUser } from "../services/userServices";
import { UserModel, UserModelWithId } from "../types/index";
import { createJwt } from "../services/authServices";

export const RegisterController = async (req: Request, res: Response) => {
  try {
    const body: UserModel = req.body;

    const user = await getUserByEmail(body.email);

    if (user) {
      return res
        .status(200)
        .json({ isError: true, message: "L'utilisateur existe déjà" });
    } else {
      const newUser: UserModelWithId = await saveNewUser(body);

      const token = createJwt(newUser);

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        // sameSite: "none"
      });

      return res.status(200).json({ isSuccess: true });
    }
  } catch (err: any) {
    return res.status(500).json({ message: "Une erreur est survenue" });
  }
};
