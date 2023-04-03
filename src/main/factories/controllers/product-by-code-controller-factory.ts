import { makeDbLoadProductFactory } from "main/factories/usecases";
import { ProductByCodeController } from "presentation/controllers";
import { Controller } from "presentation/protocols";
import { makeLogControllerDecorator } from "../decorators/log-controller-decorator-factory";

export const makeProductByCodeController = (): Controller => {
  const controller = new ProductByCodeController(makeDbLoadProductFactory());
  return makeLogControllerDecorator(controller);
};
