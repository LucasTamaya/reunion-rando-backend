import { Request, Response } from "express";

import { ActivityBody } from "../types/index";
import {
  getAllActivities,
  createNewActivity,
} from "../services/activityServices";
import { uploadImageToCloudinary } from "../helpers/cloudinaryUpload";

export const addActivityController = async (req: Request, res: Response) => {
  const { title, location, price, description, userId }: ActivityBody =
    req.body;

  try {
    const imageUrl = await uploadImageToCloudinary(req);

    const newActivity = await createNewActivity({
      title,
      location,
      description,
      userId,
      price: parseInt(price),
      image_url: imageUrl,
    });

    return res.status(200).json(newActivity);
  } catch (err: any) {
    console.log(err.message);
    return res.sendStatus(500);
  }
};

export const getAllActivitiesController = async (_: Request, res: Response) => {
  try {
    const activities = await getAllActivities();
    return res.status(200).json({ activities });
  } catch (err: any) {
    console.log(err.message);
    return res.sendStatus(500);
  }
};
