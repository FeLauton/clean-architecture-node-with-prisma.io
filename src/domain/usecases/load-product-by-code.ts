import { Product } from "domain/models";

export interface LoadProductByCode {
  loadByCode(
    code: string,
    priceTable: string,
    offset: number,
    limit: number
  ): Promise<Product>;
}
