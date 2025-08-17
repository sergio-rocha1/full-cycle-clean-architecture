import { Sequelize } from "sequelize-typescript";

import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";
import { CreateProductUseCase } from "./create.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";


describe("Integration Test create product use case", () => {
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

	it("should create a product", async () => {
		const productRepository = new ProductRepository();
		const useCase = new CreateProductUseCase(productRepository);

		const input: InputCreateProductDto = {
			type: "a",
			name: "Camisa Cavada",
			price: 85,
		};

		const expectedOutput: OutputCreateProductDto = {
			id: expect.any(String),
			name: input.name,
			price: input.price
		};

		const result = await useCase.execute(input);
		expect(result).toEqual(expectedOutput);
	});

});