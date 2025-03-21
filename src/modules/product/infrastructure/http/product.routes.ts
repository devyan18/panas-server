import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { ProductMongoRepository } from "../repositories/product-mongo.repository";
import { FindByIdProductUseCase } from "../../application/use-cases/find-by-id-product.usecase";
import { CreateProductUseCase } from "../../application/use-cases/create-product.usecase";
import { UpdateProductUseCase } from "../../application/use-cases/update-product.usecase";

const productMongoRepository = new ProductMongoRepository();

const findByIdProductUseCase = new FindByIdProductUseCase(
  productMongoRepository,
);
const createProductUseCase = new CreateProductUseCase(productMongoRepository);
const updateProductUseCase = new UpdateProductUseCase(productMongoRepository);

const productController = new ProductController(
  findByIdProductUseCase,
  createProductUseCase,
  updateProductUseCase,
);

const productRouter = Router();

productRouter.get(
  "/:productId",
  productController.findById.bind(productController),
);

productRouter.post("/", productController.create.bind(productController));
productRouter.patch(
  "/:productId",
  productController.update.bind(productController),
);

export { productRouter };
