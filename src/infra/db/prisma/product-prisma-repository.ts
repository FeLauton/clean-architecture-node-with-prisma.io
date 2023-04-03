import {
  LoadProductByCodeRepository,
  LoadProductBySerialNumberRepository,
} from "data/protocols/db";
import { Product } from "domain/models";
import { PrismaHelper } from "./prisma-helper";

export class ProductPrismaRepository
  implements LoadProductByCodeRepository, LoadProductBySerialNumberRepository
{
  async loadBySerialNumber(
    serialNumber: string,
    table: string,
    offset: number,
    limit: number
  ): Promise<Product> {
    const productCode = await PrismaHelper.getProductCodeBySerialNumber(
      serialNumber
    );

    if (productCode) {
      const product = await this.loadByCode(productCode, table, offset, limit);
      return product;
    }
    return null;
  }

  async loadByCode(
    code: string,
    table: string,
    offset: number = 0,
    limit: number = 100
  ): Promise<Product> {
    return await PrismaHelper.getProduct(code, table, offset, limit);
  }
}
