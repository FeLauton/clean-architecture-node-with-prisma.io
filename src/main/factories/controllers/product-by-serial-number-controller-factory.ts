import { makeDbLoadProductBySerialNumberFactory } from "main/factories/usecases";
import { ProductBySerialNumberController } from "presentation/controllers";
import { Controller } from "presentation/protocols";

export const makeProductBySerialNumberController = (): Controller => {
  return new ProductBySerialNumberController(
    makeDbLoadProductBySerialNumberFactory()
  );
};
