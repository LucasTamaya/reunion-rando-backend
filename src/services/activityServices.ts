import prisma from "../prisma/client";
import { ActivityModel } from "../types/index";

export const createNewActivity = async ({ ...activityData }: ActivityModel) => {
  const newActivity = await prisma.activity.create({
    data: { ...activityData },
  });
  return newActivity;
};
