import { Schema, model, Document } from "mongoose";
import type { User } from "../../domain/entities/user.entity";

export interface IUser extends Omit<User, "id">, Document {}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    nickname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

export const UserModel = model<IUser>("User", UserSchema);
