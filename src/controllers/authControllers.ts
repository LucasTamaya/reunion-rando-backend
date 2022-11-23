import bcrypt from "bcrypt";
import { Request, Response } from "express";

import { getUserByEmail, saveNewUser } from "../services/userServices";
import { UserModel, UserModelWithId } from "../types/index";
import { createJwt, sendJwtToClient } from "../services/authServices";
import { loginErrorResponse } from "../response";

export const RegisterController = async (req: Request, res: Response) => {
  const body: UserModel = req.body;

  try {
    const user = await getUserByEmail(body.email);

    if (user) {
      return res.sendStatus(409);
    }

    const newUser: UserModelWithId = await saveNewUser(body);

    const token = createJwt(newUser);
    sendJwtToClient(res, token);

    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
};

export const LoginController = async (req: Request, res: Response) => {
  const { email, password }: UserModel = req.body;

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(200).json(loginErrorResponse);
    }

    const matchingPassword = await bcrypt.compare(password, user.password);

    if (!matchingPassword) {
      return res.status(200).json(loginErrorResponse);
    }

    const token = createJwt(user);
    sendJwtToClient(res, token);

    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
};
