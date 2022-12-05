import bcrypt from "bcrypt";

import { UserModel } from "../types/index";
import prisma from "../prisma/client";

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  return user;
};

export const createNewUser = async ({ password, ...userProps }: UserModel) => {
  const hashedPassword: string = await bcrypt.hash(password, 10);
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

export const getUserData = async (userId: string) => {
  const userData = await prisma.user.findUnique({
    where: { id: userId },
    select: { avatar: true, email: true, lastname: true, firstname: true },
  });
  return userData;
};
