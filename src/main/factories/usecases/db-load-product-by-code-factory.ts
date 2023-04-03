import { DbLoadProductByCode } from "data/usecases";
import { LoadProductByCode } from "domain/usecases";
import { ProductPrismaRepository } from "infra/db/prisma";

export const makeDbLoadProductFactory = (): LoadProductByCode => {
  const productPrismaRepository = new ProductPrismaRepository();
  return new DbLoadProductByCode(productPrismaRepository);
};
