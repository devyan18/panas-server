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

  let payload = null;

  try {
    payload = await AccessToken.validate({ accessToken: token });
  } catch (error) {
    res.status(401).json({
      message: "Invalid Credentials",
    });

    console.log(error);
    return;
  }

  const { userId } = payload;

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
