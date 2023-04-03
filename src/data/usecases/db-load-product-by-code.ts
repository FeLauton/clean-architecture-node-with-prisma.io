import { LoadProductByCodeRepository } from "data/protocols/db";
import { Product } from "src/domain/models";

export class DbLoadProductByCode implements LoadProductByCodeRepository {
  constructor(
    private readonly loadProductByCodeRepository: LoadProductByCodeRepository
  ) {}

  async loadByCode(
    code: string,
    table: string,
    offset?: number,
    limit?: number
  ): Promise<Product> {
    const product: Product = await this.loadProductByCodeRepository.loadByCode(
      code,
      table,
      offset,
      limit
    );
    if (product) {
      return product;
    }
    return null;
  }
}
