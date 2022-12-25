import bcrypt from "bcrypt";
import prisma from "../prisma/client.js";
export const getUserByEmail = async (email) => {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
};
export const createNewUser = async ({ password, ...userProps }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
        data: { ...userProps, password: hashedPassword, avatar: "" },
    });
    return newUser;
};
export const getAllProviderUsers = async () => {
    const providerUsers = await prisma.user.findMany({
        where: { role: "prestataire" },
    });
    console.log(providerUsers);
    return providerUsers;
};
export const getUserData = async (userId) => {
    const userData = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            avatar: true,
            email: true,
            lastname: true,
            firstname: true,
            id: true,
        },
    });
    return userData;
};
export const updateUserData = async (userId, userData) => {
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { ...userData },
    });
    return updatedUser;
};
//# sourceMappingURL=userServices.js.map