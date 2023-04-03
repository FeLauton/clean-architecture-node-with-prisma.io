import { makeDbLoadProductBySerialNumberFactory } from "main/factories/usecases";
import { ProductBySerialNumberController } from "presentation/controllers";
import { Controller } from "presentation/protocols";
import { makeLogControllerDecorator } from "../decorators/log-controller-decorator-factory";

export const makeProductBySerialNumberController = (): Controller => {
  const controller = new ProductBySerialNumberController(
    makeDbLoadProductBySerialNumberFactory()
  );
  return makeLogControllerDecorator(controller);
};
