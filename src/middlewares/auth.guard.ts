import type { NextFunction, Request, Response } from "express";
import { AccessToken } from "../shared/tools/jwt";

export async function authGuard(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers["access-token"] || req.cookies["access-token"];

  if (!token) {
    res.status(401).json({
      message: "Invalid Credentials",
    });
    return;
  }

  const isValidToken = await AccessToken.validate(token);

  if (!isValidToken) {
    res.status(401).json({
      message: "Invalid Credentials",
    });
    return;
  }

  next();
}
