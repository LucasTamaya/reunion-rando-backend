import { Response } from "express";
import jwt from "jsonwebtoken";

export const createJwt = (id: string, role: string) => {
  const token = jwt.sign({ id, role }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  console.log(token);

  return token;
};

export const sendJwtToClient = (res: Response, token: string) => {
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
};

interface JwtPayloads {
  id: string;
  role: string;
  iat: number;
  exp: number;
}
export const decodeJwtPayload = (token: string): JwtPayloads => {
  const payload = token.split(".")[1];
  const decodedValue: JwtPayloads = JSON.parse(
    Buffer.from(payload, "base64").toString("ascii")
  );

  return decodedValue;
};
