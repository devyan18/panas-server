// user.schema.ts
import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  nickname: string; // 👈 nuevo campo
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    nickname: { type: String, required: true }, // 👈 nuevo campo
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
