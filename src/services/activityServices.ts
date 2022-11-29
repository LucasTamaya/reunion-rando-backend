import prisma from "../prisma/client";
import { ActivityModel } from "../types/index";

export const createNewActivity = async ({ ...activityData }: ActivityModel) => {
  const newActivity = await prisma.activity.create({
    data: { ...activityData },
  });
  return newActivity;
};

export const getAllActivities = async () => {
  const activities = await prisma.activity.findMany({
    include: {
      createdBy: { select: { lastname: true, firstname: true, avatar: true } },
    },
  });

  console.log(activities);

  return activities;
};
