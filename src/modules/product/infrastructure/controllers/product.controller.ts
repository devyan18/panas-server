import type { Request, Response } from "express";

import { CreateProductUseCase } from "../../application/use-cases/create-product.usecase";
import { UpdateProductUseCase } from "../../application/use-cases/update-product.usecase";
import { FindByIdProductUseCase } from "../../application/use-cases/find-by-id-product.usecase";

import { CreateProductDto } from "../../application/dto/create-product.dto";
import { UpdateProductDto } from "../../application/dto/update-product.dto";
import { FindByIdProductDto } from "../../application/dto/find-by-id-product.dto";

import { validate } from "class-validator";
import type { FindAllProductUseCase } from "../../application/use-cases/find-all-product.usecase";

export class ProductController {
  constructor(
    private readonly findAllProduductUseCase: FindAllProductUseCase,
    private readonly findByIdProductUseCase: FindByIdProductUseCase,
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
  ) {}

  async findAll(_req: Request, res: Response): Promise<void> {
    const products = await this.findAllProduductUseCase.execute();

    res.status(200).json(products);
  }

  async findById(req: Request, res: Response): Promise<void> {
    const dto = Object.assign(new FindByIdProductDto(), req.params);
    const errors = await validate(dto);

    if (errors.length) {
      res.status(400).json(errors);
      return;
    }

    const product = await this.findByIdProductUseCase.execute(dto);

    res.status(200).json(product);
  }

  async create(req: Request, res: Response): Promise<void> {
    const dto = Object.assign(new CreateProductDto(), req.body);
    const errors = await validate(dto);

    if (errors.length) {
      res.status(400).json(errors);
      return;
    }

    const product = await this.createProductUseCase.execute(dto);

    res.status(201).json(product);
  }

  async update(req: Request, res: Response): Promise<void> {
    const body = Object.assign(new UpdateProductDto(), req.body);
    const params = Object.assign(new FindByIdProductDto(), req.params);

    const bodyErrors = await validate(body);
    const paramErrors = await validate(params);

    if (bodyErrors.length || paramErrors.length) {
      const errors = [...bodyErrors, ...paramErrors];

      res.status(400).json(errors);
      return;
    }

    const updatedProduct = await this.updateProductUseCase.execute(
      params.productId,
      body,
    );

    res.status(200).json(updatedProduct);
  }
}
