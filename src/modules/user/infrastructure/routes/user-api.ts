import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserMongoRepository } from "../repositories/user-mongo.repository";
import { SignUpUserUseCase } from "../../application/use-cases/sign-up-user.usecase";
import { SignInUserUseCase } from "../../application/use-cases/sign-in-user.usecase";

const userMongoRepository = new UserMongoRepository();

const signUpUserUseCase = new SignUpUserUseCase(userMongoRepository);
const signInUserUseCase = new SignInUserUseCase(userMongoRepository);

const userController = new UserController(signUpUserUseCase, signInUserUseCase);

const userRouter = Router();

userRouter.post("/sign-up", userController.signUp.bind(userController));
userRouter.post("/sign-in", userController.signIn.bind(userController));

export { userRouter };
