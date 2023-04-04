import { LoadProductByCodeRepository } from "data/protocols/db";
import { Product } from "src/domain/models";

export class DbLoadProductByCode implements LoadProductByCodeRepository {
  constructor(
    private readonly loadProductByCodeRepository: LoadProductByCodeRepository
  ) {}

  async loadByCode(
    code: string,
    priceTable: string,
    offset?: number,
    limit?: number
  ): Promise<Product> {
    const product: Product = await this.loadProductByCodeRepository.loadByCode(
      code,
      priceTable,
      offset,
      limit
    );
    if (product) {
      return product;
    }
    return null;
  }
}
