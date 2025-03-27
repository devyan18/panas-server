import type { Request, Response } from "express";

import { SignUpUserUseCase } from "../../application/use-cases/sign-up-user.usecase";
import { SignInUserUseCase } from "../../application/use-cases/sign-in-user.usecase";

import { SignUpUserDto } from "../../application/dto/sign-up-user.dto";
import { SignInUserDto } from "../../application/dto/sign-in-user.dto";

import { validate } from "class-validator";

export class UserController {
  constructor(
    private readonly signUpUserUseCase: SignUpUserUseCase,
    private readonly signInUserUseCase: SignInUserUseCase,
  ) {}

  signUp = async (req: Request, res: Response): Promise<void> => {
    try {
      const dto = Object.assign(new SignUpUserDto(), req.body);
      const errors = await validate(dto);

      if (errors.length) {
        res.status(400).json(errors);
        return;
      }

      const user = await this.signUpUserUseCase.execute(dto);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({
        message: error,
      });
    }
  };

  signIn = async (req: Request, res: Response): Promise<void> => {
    try {
      const dto = Object.assign(new SignInUserDto(), req.body);
      const errors = await validate(dto);

      if (errors.length) {
        res.status(400).json(errors);
        return;
      }

      const data = await this.signInUserUseCase.execute(dto);
      res.status(200).json(data);
    } catch (error) {
      res.status(401).json({
        message: error,
      });
    }
  };
}
