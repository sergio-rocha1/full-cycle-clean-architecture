import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductsDto, OutputListProductsDto } from "./list.product.dto";

export class ListProductsUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(input: InputListProductsDto): Promise<OutputListProductsDto> {
        const products = await this.productRepository.findAll();

        const outputDto: OutputListProductsDto = {
            products: products.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price,
            })),
        };

        return outputDto;
    }
}