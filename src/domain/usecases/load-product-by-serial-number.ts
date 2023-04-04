import { Product } from "domain/models";

export interface LoadProductBySerialNumber {
  loadBySerialNumber(serialNumber: string): Promise<Product>;
}
