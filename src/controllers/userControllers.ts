import { Request, Response } from "express";

import {
  getAllProviderUsers,
  getUserData,
  updateUserData,
} from "../services/userServices";
import { decodeJwtPayload } from "../services/authServices";
import { UpdateUserBody } from "../types";
import { uploadImageToCloudinary } from "../services/cloudinaryServices";
import { getSavedActivities } from "../services/activityServices";

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

export const updateUserDataController = async (req: Request, res: Response) => {
  console.log("called here");

  try {
    const { id } = req.params;

    console.log(id);

    const { avatar, ...userData }: UpdateUserBody = req.body;
    let avatarUrl: string;

    console.log(req.body);
    console.log(req.file);

    if (!avatar) {
      const { secure_url } = await uploadImageToCloudinary(req);
      avatarUrl = secure_url;
    } else {
      avatarUrl = avatar;
    }

    console.log(avatarUrl);

    const updatedUser = await updateUserData(id, {
      avatar: avatarUrl,
      ...userData,
    });

    console.log(updatedUser);

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const getSavedActivitiesController = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.params;

    const activities = await getSavedActivities(userId);

    return res.status(200).json({ activities });
  } catch (err: any) {
    console.error(err.message);
    return res.sendStatus(500);
  }
};
