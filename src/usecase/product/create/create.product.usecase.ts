import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

export class CreateProductUseCase {
	private productRepository: ProductRepositoryInterface;

	constructor(productRepository: ProductRepositoryInterface) {
		this.productRepository = productRepository;
	}

	async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
		const { type, name, price } = input;

		const product = ProductFactory.create(type, name, price);

		await this.productRepository.create(product as Product);

		const outputDto: OutputCreateProductDto = {
			id: product.id,
			name: product.name,
			price: product.price,
		};

		return outputDto;
	}
}