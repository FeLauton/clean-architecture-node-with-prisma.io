import { makeLogControllerDecorator } from "main/factories/decorators/log-controller-decorator-factory";
import {
  makeDbAddUserFactory,
  makeDbAuthenticationFactory,
} from "main/factories/usecases";
import { SignUpController } from "presentation/controllers";
import { Controller } from "presentation/protocols";
import { makeSignUpValidation } from "./signup-validation-factory";

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(
    makeDbAddUserFactory(),
    makeSignUpValidation(),
    makeDbAuthenticationFactory()
  );
  return makeLogControllerDecorator(controller);
};
