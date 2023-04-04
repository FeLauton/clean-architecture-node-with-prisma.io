import { Product } from "src/domain/models";

export interface LoadProductByCodeRepository {
  loadByCode(
    code: string,
    priceTable: string,
    offset: number,
    limit: number
  ): Promise<Product>;
}
