import bcrypt from "bcrypt";

import User from "../models/User";
import { UserModel, UserModelWithId } from "../types/index";

export const getUserByEmail = async (
  email: string
): Promise<UserModelWithId | null> => {
  const user = await User.findOne({ email });

  if (user) {
    return user;
  } else {
    return null;
  }
};

export const saveNewUser = async ({ password, ...props }: UserModel) => {
  const hashedPassword: string = await bcrypt.hash(password, 10);

  const newUser = new User({ ...props, password: hashedPassword });

  newUser.save();

  return newUser;
};
