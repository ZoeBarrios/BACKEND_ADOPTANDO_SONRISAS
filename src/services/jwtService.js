import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const createToken = (loginUserDto) => {
  return jwt.sign(loginUserDto, process.env.SECRET, { expiresIn: "24h" });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET);
};
