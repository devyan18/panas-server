import { Schema, model, Document } from "mongoose";
import type { Product } from "../../domain/entities/product.entity";

export interface IProduct extends Omit<Product, "id">, Document {}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    idealStock: { type: Number, default: 1 },
    whereItBought: { type: String, required: true },
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

export const ProductModel = model<IProduct>("Product", ProductSchema);
