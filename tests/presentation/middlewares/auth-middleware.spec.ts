import { LoadUserByToken } from "domain/usecases";
import { AccessDeniedError } from "presentation/errors/access-denied-error";
import { forbidden, ok, serverError } from "presentation/helpers";
import { AuthMiddleware } from "presentation/middlewares/auth-middleware";
import { throwError } from "tests/domain/mocks";
import { mockLoadUserByToken } from "tests/presentation/mocks";

const mockRequest = () => ({
  headers: { "x-access-token": "any_token" },
});

type SutTypes = {
  sut: AuthMiddleware;
  loadUserByTokenStub: LoadUserByToken;
};

const makeSut = (role?: string): SutTypes => {
  const loadUserByTokenStub = mockLoadUserByToken();
  const sut = new AuthMiddleware(loadUserByTokenStub, role);
  return {
    sut,
    loadUserByTokenStub,
  };
};

describe("Auth Middleware", () => {
  test("should return 403 if no x-access-token exists in headers", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  test("should calls LoadUserByToken with correct values", async () => {
    const role = "any_role";
    const { sut, loadUserByTokenStub } = makeSut(role);
    const loadSpy = jest.spyOn(loadUserByTokenStub, "load");
    await sut.handle(mockRequest());
    expect(loadSpy).toHaveBeenCalledWith("any_token", "any_role");
  });

  test("should return 403 if LoadUserByToken returns null", async () => {
    const { sut, loadUserByTokenStub } = makeSut();
    jest
      .spyOn(loadUserByTokenStub, "load")
      .mockReturnValueOnce(Promise.resolve(null));
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  test("should return 200 if LoadUserByToken returns an user", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(ok({ accountId: "any_id" }));
  });

  test("should return 500 if LoadUserByToken throws", async () => {
    const { sut, loadUserByTokenStub } = makeSut();
    jest.spyOn(loadUserByTokenStub, "load").mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
