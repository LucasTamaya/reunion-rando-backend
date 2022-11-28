import { Request, Response } from "express";

import { getAllHikes } from "../services/hikeServices";

export const getHikesController = async (_: Request, res: Response) => {
  try {
    const hikes = await getAllHikes();
    return res.status(200).json({ hikes });
  } catch (err: any) {
    console.log(err.message);
    return res.sendStatus(500);
  }
};
