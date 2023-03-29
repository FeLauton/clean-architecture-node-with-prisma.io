import { Decrypter } from "data/protocols/criptography/decrypter";
import { LoadAccountByTokenRepository } from "data/protocols/db/load-account-by-token-repository";
import { DbLoadAccountByToken } from "data/usecases/db-load-account-by-token";
import { LoadAccountByToken } from "domain/usecases/load-account-by-token";
import {
  mockDecrypter,
  mockLoadAccountByTokenRepository,
} from "tests/data/mocks";
import { mockAccountModel, throwError } from "tests/domain/mocks";

const mockFakeAuthentication = () => ({
  accessToken: "any_token",
  role: "any_role",
});

interface SutTypes {
  sut: LoadAccountByToken;
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository;
  decrypterStub: Decrypter;
}

const makeSut = (): SutTypes => {
  const loadAccountByTokenRepositoryStub = mockLoadAccountByTokenRepository();
  const decrypterStub = mockDecrypter();
  const sut = new DbLoadAccountByToken(
    decrypterStub,
    loadAccountByTokenRepositoryStub
  );
  return {
    sut,
    loadAccountByTokenRepositoryStub,
    decrypterStub,
  };
};

describe("DbLoadAccountByToken UseCase", () => {
  test("Should calls Decrypter with correct values", async () => {
    const { sut, decrypterStub } = makeSut();
    const loadAccountByEmailSpy = jest.spyOn(decrypterStub, "decrypt");
    const { accessToken, role } = mockFakeAuthentication();
    await sut.load(accessToken, role);
    expect(loadAccountByEmailSpy).toHaveBeenCalledWith(accessToken);
  });

  test("Should return null Decrypter returns null", async () => {
    const { sut, decrypterStub } = makeSut();
    jest.spyOn(decrypterStub, "decrypt").mockReturnValue(null);
    const { accessToken, role } = mockFakeAuthentication();
    const response = await sut.load(accessToken, role);
    expect(response).toBe(null);
  });

  test("Should return null if Decrypter throws", async () => {
    const { sut, decrypterStub } = makeSut();
    jest.spyOn(decrypterStub, "decrypt").mockImplementationOnce(throwError);
    const { accessToken, role } = mockFakeAuthentication();
    const account = await sut.load(accessToken, role);
    expect(account).toBeNull();
  });

  test("Should calls loadAccountByTokenRepository with correct values", async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    const loadAccountByEmailSpy = jest.spyOn(
      loadAccountByTokenRepositoryStub,
      "loadAccountByToken"
    );
    const { accessToken, role } = mockFakeAuthentication();
    await sut.load(accessToken, role);
    expect(loadAccountByEmailSpy).toHaveBeenCalledWith(accessToken, role);
  });

  test("Should return null loadAccountByTokenRepository returns null", async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByTokenRepositoryStub, "loadAccountByToken")
      .mockReturnValue(null);
    const { accessToken, role } = mockFakeAuthentication();
    const response = await sut.load(accessToken, role);
    expect(response).toBe(null);
  });

  test("Should throw if loadAccountByTokenRepository throws", async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByTokenRepositoryStub, "loadAccountByToken")
      .mockImplementationOnce(throwError);
    const { accessToken, role } = mockFakeAuthentication();
    const promise = sut.load(accessToken, role);
    expect(promise).rejects.toThrow();
  });

  test("Should DbLoadAccountByToken returns an account on success", async () => {
    const { sut } = makeSut();
    const { accessToken, role } = mockFakeAuthentication();
    const response = await sut.load(accessToken, role);
    expect(response).toEqual(mockAccountModel());
  });
});
