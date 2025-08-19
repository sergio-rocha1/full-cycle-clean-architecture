import { Sequelize } from "sequelize-typescript";

import { InputListProductsDto, OutputListProductsDto } from "./list.product.dto";
import { ListProductsUseCase } from "./list.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { Product } from "../../../domain/product/entity/product";


describe("Integration Test list product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should list products", async () => {
        const productRepository = new ProductRepository();
        const useCase = new ListProductsUseCase(productRepository);

        const product1 = ProductFactory.create("a", "Camisa Cavada", 85);

        const product2 = ProductFactory.create("a", "Nike dunk", 800);

        await productRepository.create(product1 as Product);
        await productRepository.create(product2 as Product);

        const input: InputListProductsDto = {};

        const expectedOutput: OutputListProductsDto = {
            products: [
                {
                    id: product1.id,
                    name: product1.name,
                    price: product1.price,
                },
                {
                    id: product2.id,
                    name: product2.name,
                    price: product2.price,
                },
            ],
        };

        const result = await useCase.execute(input);
        expect(result).toEqual(expectedOutput);
    });

});