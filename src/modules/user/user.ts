import {
  email,
  minLength,
  object,
  pipe,
  string,
  type InferInput,
} from "valibot";
import { model, Schema } from "mongoose";

const emailSchema = pipe(string(), email());
const passwordSchema = pipe(string(), minLength(6));

export const authSchema = object({
  email: emailSchema,
  password: passwordSchema,
});

export type User = InferInput<typeof authSchema> & {
  id: string;
  username: string;
};

const userSchema = new Schema<User>(
  {
    email: emailSchema,
    password: passwordSchema,
    username: string(),
  },
  {
    versionKey: false,
  }
);

export const UserModel = model<User>("User", userSchema);
