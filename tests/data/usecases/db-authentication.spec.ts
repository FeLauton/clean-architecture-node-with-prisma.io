import { Encrypter, HashComparer } from "data/protocols/criptography";
import {
  LoadUserByEmailRepository,
  UpdateAccessTokenRepository,
} from "data/protocols/db";
import { DbAuthentication } from "data/usecases";
import { Authentication } from "domain/usecases";
import {
  mockEncrypter,
  mockHashComparer,
  mockLoadUserByEmailRepository,
  mockUpdateAccessTokenRepository,
} from "tests/data/mocks";
import { mockAuthenticationParams, throwError } from "tests/domain/mocks";

interface SutTypes {
  sut: Authentication;
  loadUserByEmailRepositoryStub: LoadUserByEmailRepository;
  hashComparerStub: HashComparer;
  encrypterStub: Encrypter;
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository;
}

const makeSut = (): SutTypes => {
  const hashComparerStub = mockHashComparer();
  const encrypterStub = mockEncrypter();
  const updateAccessTokenRepositoryStub = mockUpdateAccessTokenRepository();
  const loadUserByEmailRepositoryStub = mockLoadUserByEmailRepository();
  const sut = new DbAuthentication(
    loadUserByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  );
  return {
    sut,
    loadUserByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenRepositoryStub,
  };
};

describe("DBAuthentication UseCase", () => {
  test("Should calls loadUserByEmailRepository with correct email", async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut();
    const loadUserByEmailSpy = jest.spyOn(
      loadUserByEmailRepositoryStub,
      "loadUserByEmail"
    );
    await sut.auth(mockAuthenticationParams());
    expect(loadUserByEmailSpy).toHaveBeenCalledWith("any_email@mail.com");
  });

  test("Should throw if loadUserByEmailRepository throws", async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(loadUserByEmailRepositoryStub, "loadUserByEmail")
      .mockImplementationOnce(throwError);
    const promise = sut.auth(mockAuthenticationParams());
    expect(promise).rejects.toThrow();
  });

  test("Should return null loadUserByEmailRepository returns null", async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(loadUserByEmailRepositoryStub, "loadUserByEmail")
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
