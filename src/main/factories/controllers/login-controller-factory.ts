import { makeLogControllerDecorator } from "main/factories/decorators/log-controller-decorator-factory";
import { makeDbAuthenticationFactory } from "main/factories/usecases";
import { LoginController } from "presentation/controllers";
import { Controller } from "presentation/protocols";
import { makeLoginValidation } from "./login-validation-factory";

export const makeLoginController = (): Controller => {
  const controller = new LoginController(
    makeDbAuthenticationFactory(),
    makeLoginValidation()
  );
  return makeLogControllerDecorator(controller);
};
