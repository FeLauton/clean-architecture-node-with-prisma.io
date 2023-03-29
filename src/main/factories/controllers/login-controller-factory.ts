import { makeLogControllerDecorator } from "main/factories/decorators/log-controller-decorator-factory";
import { makeDbAuthenticationFactory } from "main/factories/usecases/db-authentication-factory";
import { LoginController } from "presentation/controllers/login-controller";
import { Controller } from "presentation/protocols";
import { makeLoginValidation } from "./login-validation-factory";

export const makeLoginController = (): Controller => {
  const controller = new LoginController(
    makeDbAuthenticationFactory(),
    makeLoginValidation()
  );
  return makeLogControllerDecorator(controller);
};
