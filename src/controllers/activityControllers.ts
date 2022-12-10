import { Request, Response } from "express";

import { ActivityBody } from "../types/index";
import {
  getAllActivities,
  createNewActivity,
  getAllProviderActivities,
  deleteActivity,
  updateActivity,
} from "../services/activityServices";
import {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} from "../services/cloudinaryServices";

export const addActivityController = async (req: Request, res: Response) => {
  try {
    const { title, location, price, description, userId }: ActivityBody =
      req.body;

    const { secure_url, public_id } = await uploadImageToCloudinary(req);

    const newActivity = await createNewActivity({
      title,
      location,
      description,
      userId,
      price: parseInt(price),
      image_url: secure_url,
      cloudinary_public_id: public_id,
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

export const getAllProviderActivitiesController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const providerActivities = await getAllProviderActivities(id);

    if (!providerActivities) {
      return res.status(200).json({ activities: [] });
    } else {
      return res.status(200).json({ activities: providerActivities });
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const deleteActivityController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { cloudinaryPublicId } = req.body;

    await deleteActivity(id);
    await deleteImageFromCloudinary(cloudinaryPublicId);

    return res.status(200).json({ activityId: id });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const updateActivityController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { price, file, ...activityProps }: ActivityBody = req.body;
    let imageUrl: string;

    if (!file) {
      const { secure_url } = await uploadImageToCloudinary(req);
      imageUrl = secure_url;
    } else {
      imageUrl = file;
    }

    const updatedActivity = await updateActivity(id, {
      price: parseInt(price),
      image_url: imageUrl,
      cloudinary_public_id: "UPDATES HEREEE",
      ...activityProps,
    });

    console.log(updatedActivity);

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
