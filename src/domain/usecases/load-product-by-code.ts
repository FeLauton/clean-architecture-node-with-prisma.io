import { Product } from "domain/models";

export interface LoadProductByCode {
  loadByCode(
    code: string,
    table: string,
    offset: number,
    limit: number
  ): Promise<Product>;
}
