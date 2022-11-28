import { Request, Response } from "express";

import { createNewActivity } from "./../services/activityServices";
import { ActivityModel } from "../types/index";

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
