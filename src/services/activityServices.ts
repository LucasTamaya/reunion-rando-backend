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
      createdBy: {
        select: { lastname: true, firstname: true, avatar: true, email: true },
      },
    },
  });

  return activities;
};

export const getAllProviderActivities = async (userId: string) => {
  const providerActivities = await prisma.activity.findMany({
    where: { createdById: userId },
  });
  return providerActivities;
};

export const deleteActivity = async (activityId: string) => {
  await prisma.activity.delete({
    where: { id: activityId },
  });
};

export const updateActivity = async (
  activityId: string,
  { ...activityData }: ActivityModel
) => {
  console.log(activityData);

  const updatedActivity = await prisma.activity.update({
    where: {
      id: activityId,
    },
    data: {
      ...activityData,
    },
  });
  return updatedActivity;
};

export const hasBeenAlreadySaved = async (
  activityId: string,
  userId: string
) => {
  // Query the database for an activity with the given activityId that has the
  // given userId in its 'savedByIds' field
  const savedByGivenUserId = await prisma.activity.findMany({
    where: { id: activityId, savedByIds: { has: userId } },
  });

  if (savedByGivenUserId.length === 0) {
    return false;
  }

  return true;
};

export const saveActivity = async (activityId: string, userId: string) => {
  await prisma.activity.update({
    where: { id: activityId },
    data: {
      savedByIds: { push: userId },
    },
  });
};
