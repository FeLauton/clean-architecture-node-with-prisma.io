import { DbAddAccount } from "data/usecases/db-add-account";
import {
  AddAccountRepository,
  Hasher,
  LoadAccountByEmailRepository,
} from "data/usecases/db-add-account-protocols";
import {
  mockAddAccountRepository,
  mockHasher,
  mockLoadAccountByEmailRepository,
} from "tests/data/mocks";
import {
  mockAccountModel,
  mockAddAccountParams,
  throwError,
} from "tests/domain/mocks";

interface SutTypes {
  sut: DbAddAccount;
  hasherStub: Hasher;
  addAccountRepositoryStub: AddAccountRepository;
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository;
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = mockAddAccountRepository();
  const hasherStub = mockHasher();
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository();
  jest
    .spyOn(loadAccountByEmailRepositoryStub, "loadAccountByEmail")
    .mockReturnValue(Promise.resolve(null));
  const sut = new DbAddAccount(
    hasherStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub
  );
  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub,
  };
};

describe("DbAddAccount Usecase", () => {
  test("Should call Hasher with correct password", async () => {
    const { sut, hasherStub } = makeSut();
    const hasherSpy = jest.spyOn(hasherStub, "hash");
    await sut.add(mockAddAccountParams());
    expect(hasherSpy).toHaveBeenCalledWith("any_password");
  });

  test("Should throw if Hasher throws", async () => {
    const { sut, hasherStub } = makeSut();
    jest.spyOn(hasherStub, "hash").mockImplementationOnce(throwError);
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow();
  });

  test("Should call AddAccountRepository with correct values", async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, "add");
    await sut.add(mockAddAccountParams());
    expect(addSpy).toHaveBeenCalledWith({
      name: "any_name",
      email: "any_email@mail.com",
      password: "hashed_password",
    });
  });

  test("Should throw if AddAccountRepository throws", async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    jest
      .spyOn(addAccountRepositoryStub, "add")
      .mockImplementationOnce(throwError);
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow();
  });

  test("Should return an account on success", async () => {
    const { sut } = makeSut();
    const account = await sut.add(mockAddAccountParams());
    expect(account).toEqual(mockAccountModel());
  });

  test("Should return null if loadAccountByEmailRepository return an account", async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByEmailRepositoryStub, "loadAccountByEmail")
      .mockReturnValueOnce(Promise.resolve(mockAccountModel()));
    const account = await sut.add(mockAddAccountParams());
    expect(account).toBe(null);
  });

  test("Should calls loadAccountByEmailRepository with correct email", async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadAccountByEmailSpy = jest.spyOn(
      loadAccountByEmailRepositoryStub,
      "loadAccountByEmail"
    );
    await sut.add(mockAddAccountParams());
    expect(loadAccountByEmailSpy).toHaveBeenCalledWith("any_email@mail.com");
  });
});
