import { AddUser, Authentication } from "domain/usecases";
import { SignUpController } from "presentation/controllers";
import {
  EmailInUseError,
  MissingParamError,
  ServerError,
} from "presentation/errors";
import { badRequest, forbidden, ok, serverError } from "presentation/helpers";
import { HttpRequest, Validation } from "presentation/protocols";
import { throwError } from "tests/domain/mocks";
import { mockAddUser, mockAuthentication } from "tests/presentation/mocks";
import { mockValidation } from "tests/validation/mocks";

const mockRequest = (): HttpRequest => ({
  body: {
    name: "any_name",
    email: "any_email@mail.com",
    password: "any_password",
    passwordConfirmation: "any_password",
  },
});

interface SutTypes {
  sut: SignUpController;
  addUserStub: AddUser;
  validationStub: Validation;
  authenticationStub: Authentication;
}

const makeSut = (): SutTypes => {
  const addUserStub = mockAddUser();
  const validationStub = mockValidation();
  const authenticationStub = mockAuthentication();
  const sut = new SignUpController(
    addUserStub,
    validationStub,
    authenticationStub
  );
  return {
    sut,
    addUserStub,
    validationStub,
    authenticationStub,
  };
};

describe("SignUp Controller", () => {
  test("Should call AddUser with correct values", async () => {
    const { sut, addUserStub } = makeSut();
    const addSpy = jest.spyOn(addUserStub, "add");
    await sut.handle(mockRequest());
    expect(addSpy).toHaveBeenCalledWith({
      name: "any_name",
      email: "any_email@mail.com",
      password: "any_password",
    });
  });

  test("Should return 500 if addUser throws", async () => {
    const { sut, addUserStub } = makeSut();
    jest.spyOn(addUserStub, "add").mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    const fakeError = new Error();
    fakeError.stack = "any_stack";
    expect(httpResponse).toEqual(serverError(new ServerError("")));
  });

  test("Should return 403 if addUser returns null", async () => {
    const { sut, addUserStub } = makeSut();
    jest.spyOn(addUserStub, "add").mockReturnValueOnce(Promise.resolve(null));
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()));
  });

  test("Should return 200 if valid data is provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(
      ok({ accessToken: "any_token", name: "any_name" })
    );
  });

  test("Should call Validation with correct values", async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, "validate");
    const httpRequest = mockRequest();
    await sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test("Should return 400 if Validation returns an error", async () => {
    const { sut, validationStub } = makeSut();
    jest
      .spyOn(validationStub, "validate")
      .mockReturnValueOnce(new MissingParamError("any_field"));
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError("any_field"))
    );
  });

  test("Should calls Authentication with correct values", async () => {
    const { sut, authenticationStub } = makeSut();
    const authSpy = jest.spyOn(authenticationStub, "auth");
    await sut.handle(mockRequest());
    expect(authSpy).toHaveBeenCalledWith({
      email: "any_email@mail.com",
      password: "any_password",
    });
  });

  test("Should return 500 if Authenticate throws", async () => {
    const { sut, authenticationStub } = makeSut();
    jest.spyOn(authenticationStub, "auth").mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should return 200 if valid data is provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(
      ok({ accessToken: "any_token", name: "any_name" })
    );
  });
});
