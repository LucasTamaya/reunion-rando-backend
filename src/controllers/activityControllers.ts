import { Request, Response } from "express";

import { ActivityModel } from "../types/index";
import {
  getAllActivities,
  createNewActivity,
} from "../services/activityServices";

export const addActivityController = async (req: Request, res: Response) => {
  const body: ActivityModel = req.body;

  try {
    await createNewActivity({ ...body });
    return res.sendStatus(200);
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
