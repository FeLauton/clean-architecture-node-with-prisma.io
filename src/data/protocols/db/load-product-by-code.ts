import { Product } from "src/domain/models";

export interface LoadProductByCodeRepository {
  loadByCode(
    code: string,
    table: string,
    offset?: number,
    limit?: number
  ): Promise<Product>;
}
