import { Encrypter } from "data/protocols/criptography/encrypter";
import { HashComparer } from "data/protocols/criptography/hash-compare";
import { LoadAccountByEmailRepository } from "data/protocols/db/load-account-by-email-repository";
import { UpdateAccessTokenRepository } from "data/protocols/db/update-access-token-repository";
import { DbAuthentication } from "data/usecases/db-authentication";
import { Authentication } from "domain/usecases/authentication";
import {
  mockEncrypter,
  mockHashComparer,
  mockLoadAccountByEmailRepository,
  mockUpdateAccessTokenRepository,
} from "tests/data/mocks";
import { mockAuthenticationParams, throwError } from "tests/domain/mocks";

interface SutTypes {
  sut: Authentication;
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository;
  hashComparerStub: HashComparer;
  encrypterStub: Encrypter;
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository;
}

const makeSut = (): SutTypes => {
  const hashComparerStub = mockHashComparer();
  const encrypterStub = mockEncrypter();
  const updateAccessTokenRepositoryStub = mockUpdateAccessTokenRepository();
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository();
  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  );
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenRepositoryStub,
  };
};

describe("DBAuthentication UseCase", () => {
  test("Should calls loadAccountByEmailRepository with correct email", async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadAccountByEmailSpy = jest.spyOn(
      loadAccountByEmailRepositoryStub,
      "loadAccountByEmail"
    );
    await sut.auth(mockAuthenticationParams());
    expect(loadAccountByEmailSpy).toHaveBeenCalledWith("any_email@mail.com");
  });

  test("Should throw if loadAccountByEmailRepository throws", async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByEmailRepositoryStub, "loadAccountByEmail")
      .mockImplementationOnce(throwError);
    const promise = sut.auth(mockAuthenticationParams());
    expect(promise).rejects.toThrow();
  });

  test("Should return null loadAccountByEmailRepository returns null", async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByEmailRepositoryStub, "loadAccountByEmail")
      .mockReturnValue(null);
    const model = await sut.auth(mockAuthenticationParams());
    expect(model).toBe(null);
  });

  test("Should calls HashComparer with correct values", async () => {
    const { sut, hashComparerStub } = makeSut();
    const compareSpy = jest.spyOn(hashComparerStub, "compare");
    await sut.auth(mockAuthenticationParams());
    expect(compareSpy).toHaveBeenCalledWith("any_password", "any_password");
  });

  test("Should throw if HashComparer throws", async () => {
    const { sut, hashComparerStub } = makeSut();
    jest.spyOn(hashComparerStub, "compare").mockImplementationOnce(throwError);
    const promise = sut.auth(mockAuthenticationParams());
    expect(promise).rejects.toThrow();
  });

  test("Should return null hashComparer returns false", async () => {
    const { sut, hashComparerStub } = makeSut();
    jest
      .spyOn(hashComparerStub, "compare")
      .mockReturnValue(Promise.resolve(false));
    const model = await sut.auth(mockAuthenticationParams());
    expect(model).toBe(null);
  });

  test("Should calls Encrypter with correct id", async () => {
    const { sut, encrypterStub } = makeSut();
    const generateSpy = jest.spyOn(encrypterStub, "encrypt");
    await sut.auth(mockAuthenticationParams());
    expect(generateSpy).toHaveBeenCalledWith("any_id");
  });

  test("Should throw if Encrypter throws", async () => {
    const { sut, encrypterStub } = makeSut();
    jest.spyOn(encrypterStub, "encrypt").mockImplementationOnce(throwError);
    const promise = sut.auth(mockAuthenticationParams());
    expect(promise).rejects.toThrow();
  });

  test("Should returns an AuthenticationModel on success", async () => {
    const { sut } = makeSut();
    const { accessToken, name } = await sut.auth(mockAuthenticationParams());
    expect(accessToken).toBe("any_token");
    expect(name).toBe("any_name");
  });

  test("Should calls UpdateAccessTokenRepository with correct values", async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut();
    const generateSpy = jest.spyOn(
      updateAccessTokenRepositoryStub,
      "updateAccessToken"
    );
    await sut.auth(mockAuthenticationParams());
    expect(generateSpy).toHaveBeenCalledWith("any_id", "any_token");
  });

  test("Should throw if UpdateAccessTokenRepository throws", async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut();
    jest
      .spyOn(updateAccessTokenRepositoryStub, "updateAccessToken")
      .mockImplementationOnce(throwError);
    const promise = sut.auth(mockAuthenticationParams());
    expect(promise).rejects.toThrow();
  });
});
