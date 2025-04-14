import { type CartRepository } from "../interfaces/cart-repository.interface";
import { CreateCartDto } from "../dto/create-cart.dto";
import { Cart, type ProductShop } from "../../domain/entities/cart.entity";
import type { ProductRepository } from "../../../product/application/interfaces/product-repository.interface";
import { Product } from "../../../product/domain/entities/product.entity";

export class CreateCartUseCase {
  constructor(
    private readonly repository: CartRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(createCartDto: CreateCartDto): Promise<Cart> {
    const { items } = createCartDto;

    const notCreatedItems = items.filter(e => {
      if (e.isExisting == true)
        return new Product(
          e.id,
          e.name,
          e.price,
          e.stock,
          e.idealStock,
          e.whereItBought,
        );

      return false;
    }) as Product[];

    const result = await this.productRepository.createMany(notCreatedItems);

    const createdItemsToProductShop: ProductShop[] = items.map(e => {
      if (e.isExisting == true) {
        return {
          ...e,
          totalPrice: e.price * e.quantity,
          finalPrice: e.totalPrice - e.discount,
        } as ProductShop;
      }
    });

    const createdCart = await this.repository.create(cart);

    if (!createdCart) throw new Error("Problems creating cart");

    return createdCart;
  }
}
