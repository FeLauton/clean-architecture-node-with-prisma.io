import { DbLoadProductBySerialNumber } from "data/usecases";
import { LoadProductBySerialNumber } from "domain/usecases";
import { ProductPrismaRepository } from "infra/db/prisma";

export const makeDbLoadProductBySerialNumberFactory =
  (): LoadProductBySerialNumber => {
    const productPrismaRepository = new ProductPrismaRepository();
    return new DbLoadProductBySerialNumber(productPrismaRepository);
  };
