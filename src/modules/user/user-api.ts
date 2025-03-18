import { Router } from "express";
import { userService } from "./user-defs";

const userRouter = Router();

userRouter.post("/users", async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
});

userRouter.get("/users/:id", async (req, res) => {
  const user = await userService.getUserById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).send();
  }
});

export { userRouter };
