import {
  LoadProductByCodeRepository,
  LoadProductBySerialNumberRepository,
} from "data/protocols/db";
import { Product } from "domain/models";
import { PrismaHelper } from "./prisma-helper";

export class ProductPrismaRepository
  implements LoadProductByCodeRepository, LoadProductBySerialNumberRepository
{
  async loadBySerialNumber(serialNumber: string): Promise<Product> {
    const productCode = await PrismaHelper.getProductCodeBySerialNumber(
      serialNumber
    );

    if (productCode) {
      const product = await this.loadByCode(productCode, "", 0, 100);
      return product;
    }
    return null;
  }

  async loadByCode(
    code: string,
    priceTable: string,
    offset: number = 0,
    limit: number = 100
  ): Promise<Product> {
    return await PrismaHelper.getProduct(code, priceTable, offset, limit);
  }
}
