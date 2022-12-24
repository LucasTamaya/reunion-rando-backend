import prisma from "../prisma/client.js";
export const getAllHikes = async () => {
    const hikes = await prisma.hike.findMany({ select: { name: true } });
    return hikes;
};
//# sourceMappingURL=hikeServices.js.map