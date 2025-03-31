import { Cart, type ProductShop } from "../../domain/entities/cart.entity";

export interface CartRepository {
  findAll(): Promise<Cart[]>;
  create(listOfProducts: ProductShop[]): Promise<Cart>;
}
