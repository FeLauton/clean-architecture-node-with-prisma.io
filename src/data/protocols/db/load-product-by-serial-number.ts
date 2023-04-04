import { Product } from "src/domain/models";

export interface LoadProductBySerialNumberRepository {
  loadBySerialNumber(serialNumber: string): Promise<Product>;
}
