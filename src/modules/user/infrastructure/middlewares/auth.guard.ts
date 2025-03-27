import type { NextFunction, Request, Response } from "express";
import { AccessToken } from "../../../../shared/tools/jwt";
import { UserMongoRepository } from "../repositories/user-mongo.repository";

const userMongoRepository = new UserMongoRepository();

export async function authGuard(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers["access-token"] || req.cookies["access-token"];

  console.log(token);
  if (!token) {
    res.status(401).json({
      message: "Invalid Credentials",
    });
    return;
  }

  const isValidToken = await AccessToken.validate({ accessToken: token });

  if (!isValidToken) {
    res.status(401).json({
      message: "Invalid Credentials",
    });
    return;
  }

  const { userId } = isValidToken;

  const user = await userMongoRepository.findById(userId);

  if (!user) {
    res.status(401).json({
      message: "Invalid Credentials",
    });
    return;
  }

  req.user = user;

  next();
}
