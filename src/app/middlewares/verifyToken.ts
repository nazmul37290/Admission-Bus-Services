/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
interface AuthRequest extends Request {
  user?: any; // Adjust `any` to the expected type (e.g., `UserPayload`)
}
const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  console.log(token, "from middleware");
  if (!token) {
    res.status(401).json({ message: "Access Denied" });
  }
  try {
    const decoded = jwt.verify(
      token as string,
      config.jwt_token_secret as string
    );
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
export default verifyToken;
