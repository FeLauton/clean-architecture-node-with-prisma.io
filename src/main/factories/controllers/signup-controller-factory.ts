import { makeLogControllerDecorator } from "main/factories/decorators/log-controller-decorator-factory";
import { makeDbAddAccountFactory } from "main/factories/usecases/db-add-account-factory";
import { makeDbAuthenticationFactory } from "main/factories/usecases/db-authentication-factory";
import { SignUpController } from "presentation/controllers/signup-controller";
import { Controller } from "presentation/protocols";
import { makeSignUpValidation } from "./signup-validation-factory";

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(
    makeDbAddAccountFactory(),
    makeSignUpValidation(),
    makeDbAuthenticationFactory()
  );
  return makeLogControllerDecorator(controller);
};
