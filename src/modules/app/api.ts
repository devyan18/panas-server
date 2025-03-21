import express, { type Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { userRouter } from "../user/infrastructure/http/user.routes";
import { productRouter } from "../product/infrastructure/http/product.routes";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/user", userRouter);
app.use("/products", productRouter);

export { app };
