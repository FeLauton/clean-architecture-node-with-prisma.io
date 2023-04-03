import { LoadProductBySerialNumberRepository } from "data/protocols/db";
import { Product } from "src/domain/models";

export class DbLoadProductBySerialNumber
  implements LoadProductBySerialNumberRepository
{
  constructor(
    private readonly loadProductBySerialNumberRepository: LoadProductBySerialNumberRepository
  ) {}

  async loadBySerialNumber(
    code: string,
    table: string,
    offset?: number,
    limit?: number
  ): Promise<Product> {
    const product: Product =
      await this.loadProductBySerialNumberRepository.loadBySerialNumber(
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
