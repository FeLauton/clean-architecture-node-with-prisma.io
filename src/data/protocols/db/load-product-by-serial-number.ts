import { Product } from "src/domain/models";

export interface LoadProductBySerialNumberRepository {
  loadBySerialNumber(
    serialNumber: string,
    table: string,
    offset: number,
    limit: number
  ): Promise<Product>;
}
