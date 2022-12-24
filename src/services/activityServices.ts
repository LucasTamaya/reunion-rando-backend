import prisma from "../prisma/client.js";
import { ActivityModel } from "../types/index.js";

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

export const getSavedActivities = async (userId: string) => {
  const savedActivities = await prisma.activity.findMany({
    where: { savedByIds: { has: userId } },
    include: { createdBy: true },
  });

  console.log(savedActivities);

  return savedActivities;
};

export const unsaveActivity = async (activityId: string, userId: string) => {
  // retrieve the list of ids of users who have saved this activity
  const currentData = await prisma.activity.findUnique({
    where: { id: activityId },
    select: { savedByIds: true },
  });
  console.log("activités courante: ", currentData);

  // filter the list by removing the given userId
  const filteredSavedByIds = currentData?.savedByIds.filter(
    (id) => id !== userId
  );
  console.log("filtré: ", filteredSavedByIds);

  // use the set method of prisma to update the entire list in the database
  await prisma.activity.update({
    where: { id: activityId },
    data: {
      savedByIds: {
        set: filteredSavedByIds,
      },
    },
  });
};
