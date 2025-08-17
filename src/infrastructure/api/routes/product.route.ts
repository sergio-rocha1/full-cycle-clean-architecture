import express, { Request, Response } from "express";

import ProductRepository from "../../product/repository/sequelize/product.repository";

import { InputCreateProductDto } from "../../../usecase/product/create/create.product.dto";
import { CreateProductUseCase } from "../../../usecase/product/create/create.product.usecase";
import { ListProductsUseCase } from "../../../usecase/product/list/list.product.usecase";

export const productRoute = express.Router();
const repository = new ProductRepository();

productRoute.post("/", async (request: Request, response: Response) => {
    const usecase = new CreateProductUseCase(repository);

    try {
        const { type, name, price } = request.body;

        const customerDto: InputCreateProductDto = {
            type,
            name,
            price
        };

        const output = await usecase.execute(customerDto);

        response.status(201).send(output);
    } catch (error) {
        response.status(400).send(error);
    }
});

productRoute.get("/", async (request: Request, response: Response) => {
    const usecase = new ListProductsUseCase(repository);

    try {
        const output = await usecase.execute({});

        response.status(200).send(output);
    } catch (error) {
        response.status(400).send(error);
    }
});