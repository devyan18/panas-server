import type { Product } from "../../../product/domain/entities/product.entity";

export type ProductShop = Product & {
  quantity: number;
  totalPrice: number;
  discount: number;
  finalPrice: number;
};

export class Cart {
  constructor(
    public readonly id: string,
    public dateOfShopping: Date,
    public listOfProducts: ProductShop[],
    public totalPrice: number,
  ) {}
}
