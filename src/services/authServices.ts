import jwt from "jsonwebtoken";

import { UserModelWithId } from "../types/index";

export const createJwt = (user: UserModelWithId) => {
  return jwt.sign({ ...user }, process.env.JWT_SECRET!, { expiresIn: "1d" });
};
