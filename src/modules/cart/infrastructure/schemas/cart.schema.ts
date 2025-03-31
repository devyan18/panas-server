import { Schema, model, Document } from "mongoose";
import type { Cart } from "../../domain/entities/cart.entity";

export interface ICart extends Omit<Cart, "id">, Document {}

const CartSchema = new Schema<ICart>(
  {
    listOfProducts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
    totalPrice: { type: Number, required: true },
    dateOfShopping: { type: Date, default: Date.now },
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

export const CartModel = model<ICart>("Cart", CartSchema);
