import { Product } from "domain/models";

export interface LoadProductBySerialNumber {
  loadBySerialNumber(
    serialNumber: string,
    table: string,
    offset: number,
    limit: number
  ): Promise<Product>;
}
