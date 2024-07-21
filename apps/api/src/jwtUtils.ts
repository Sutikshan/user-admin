// src/utils/jwtUtils.ts

import jwt from "jsonwebtoken";

// TODO: pull secret key from env
const SECRET_KEY = process.env.JWT_SECRET_KEY as string;

export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: "1h" });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, SECRET_KEY);
};
