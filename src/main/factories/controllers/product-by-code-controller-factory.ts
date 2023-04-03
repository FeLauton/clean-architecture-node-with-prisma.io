import { makeDbLoadProductFactory } from "main/factories/usecases";
import { ProductByCodeController } from "presentation/controllers";
import { Controller } from "presentation/protocols";

export const makeProductByCodeController = (): Controller => {
  return new ProductByCodeController(makeDbLoadProductFactory());
};
