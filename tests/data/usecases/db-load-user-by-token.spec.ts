import { Decrypter } from "data/protocols/criptography";
import { LoadUserByTokenRepository } from "data/protocols/db";
import { DbLoadUserByToken } from "data/usecases";
import { LoadUserByToken } from "domain/usecases";
import { mockDecrypter, mockLoadUserByTokenRepository } from "tests/data/mocks";
import { mockUserModel, throwError } from "tests/domain/mocks";

const mockFakeAuthentication = () => ({
  accessToken: "any_token",
  role: "any_role",
});

interface SutTypes {
  sut: LoadUserByToken;
  loadUserByTokenRepositoryStub: LoadUserByTokenRepository;
  decrypterStub: Decrypter;
}

const makeSut = (): SutTypes => {
  const loadUserByTokenRepositoryStub = mockLoadUserByTokenRepository();
  const decrypterStub = mockDecrypter();
  const sut = new DbLoadUserByToken(
    decrypterStub,
    loadUserByTokenRepositoryStub
  );
  return {
    sut,
    loadUserByTokenRepositoryStub,
    decrypterStub,
  };
};

describe("DbLoadUserByToken UseCase", () => {
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
    const user = await sut.load(accessToken, role);
    expect(user).toBeNull();
  });

  test("Should return null if Decrypter throws", async () => {
    const { sut, decrypterStub } = makeSut();
    jest.spyOn(decrypterStub, "decrypt").mockImplementationOnce(throwError);
    const { accessToken, role } = mockFakeAuthentication();
    const user = await sut.load(accessToken, role);
    expect(user).toBeNull();
  });

  test("Should call LoadUserByTokenRepository with correct values", async () => {
    const { sut, loadUserByTokenRepositoryStub } = makeSut();
    const loadByTokenSpy = jest.spyOn(
      loadUserByTokenRepositoryStub,
      "loadUserByToken"
    );
    const { accessToken, role } = mockFakeAuthentication();
    await sut.load(accessToken, role);
    expect(loadByTokenSpy).toHaveBeenCalledWith(accessToken, role);
  });

  test("Should return null if LoadUserByTokenRepository returns null", async () => {
    const { sut, loadUserByTokenRepositoryStub } = makeSut();
    jest
      .spyOn(loadUserByTokenRepositoryStub, "loadUserByToken")
      .mockReturnValueOnce(new Promise((resolve) => resolve(null)));
    const { accessToken, role } = mockFakeAuthentication();
    const user = await sut.load(accessToken, role);
    expect(user).toBeNull();
  });

  test("Should throw if loadUserByTokenRepository throws", async () => {
    const { sut, loadUserByTokenRepositoryStub } = makeSut();
    jest
      .spyOn(loadUserByTokenRepositoryStub, "loadUserByToken")
      .mockImplementationOnce(throwError);
    const { accessToken, role } = mockFakeAuthentication();
    const promise = sut.load(accessToken, role);
    expect(promise).rejects.toThrow();
  });

  test("Should return an user on success", async () => {
    const { sut } = makeSut();
    const { accessToken, role } = mockFakeAuthentication();
    const user = await sut.load(accessToken, role);
    expect(user).toEqual(mockUserModel());
  });
});
