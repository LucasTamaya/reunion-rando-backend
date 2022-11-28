import prisma from "../prisma/client";

export const getAllHikes = async () => {
  const hikes = await prisma.hike.findMany({ select: { name: true } });
  return hikes;
};
