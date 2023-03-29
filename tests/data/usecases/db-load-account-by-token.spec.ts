import { Decrypter } from "data/protocols/criptography";
import { LoadAccountByTokenRepository } from "data/protocols/db";
import { DbLoadAccountByToken } from "data/usecases";
import { LoadAccountByToken } from "domain/usecases";
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
  test("Should call Decrypter with correct value", async () => {
    const { sut, decrypterStub } = makeSut();
    const decryptSpy = jest.spyOn(decrypterStub, "decrypt");
    const { accessToken, role } = mockFakeAuthentication();
    await sut.load(accessToken, role);
    expect(decryptSpy).toHaveBeenCalledWith(accessToken);
  });

  test("Should return null if Decrypter returns null", async () => {
    const { sut, decrypterStub } = makeSut();
    jest.spyOn(decrypterStub, "decrypt").mockReturnValueOnce(null);
    const { accessToken, role } = mockFakeAuthentication();
    const account = await sut.load(accessToken, role);
    expect(account).toBeNull();
  });

  test("Should return null if Decrypter throws", async () => {
    const { sut, decrypterStub } = makeSut();
    jest.spyOn(decrypterStub, "decrypt").mockImplementationOnce(throwError);
    const { accessToken, role } = mockFakeAuthentication();
    const account = await sut.load(accessToken, role);
    expect(account).toBeNull();
  });

  test("Should call LoadAccountByTokenRepository with correct values", async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    const loadByTokenSpy = jest.spyOn(
      loadAccountByTokenRepositoryStub,
      "loadAccountByToken"
    );
    const { accessToken, role } = mockFakeAuthentication();
    await sut.load(accessToken, role);
    expect(loadByTokenSpy).toHaveBeenCalledWith(accessToken, role);
  });

  test("Should return null if LoadAccountByTokenRepository returns null", async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByTokenRepositoryStub, "loadAccountByToken")
      .mockReturnValueOnce(new Promise((resolve) => resolve(null)));
    const { accessToken, role } = mockFakeAuthentication();
    const account = await sut.load(accessToken, role);
    expect(account).toBeNull();
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

  test("Should return an account on success", async () => {
    const { sut } = makeSut();
    const { accessToken, role } = mockFakeAuthentication();
    const account = await sut.load(accessToken, role);
    expect(account).toEqual(mockAccountModel());
  });
});
