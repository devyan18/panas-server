import express, { type Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import passport from "passport";
import { userRouter } from "../../modules/user/infrastructure/routes/user-api";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(passport.initialize());

app.use("/user", userRouter);

export { app };
