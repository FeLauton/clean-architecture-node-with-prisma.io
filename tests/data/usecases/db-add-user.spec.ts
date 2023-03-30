import {
  AddUserRepository,
  DbAddUser,
  Hasher,
  LoadUserByEmailRepository,
} from "data/usecases";
import {
  mockAddUserRepository,
  mockHasher,
  mockLoadUserByEmailRepository,
} from "tests/data/mocks";
import {
  mockAddUserParams,
  mockUserModel,
  throwError,
} from "tests/domain/mocks";

interface SutTypes {
  sut: DbAddUser;
  hasherStub: Hasher;
  addUserRepositoryStub: AddUserRepository;
  loadUserByEmailRepositoryStub: LoadUserByEmailRepository;
}

const makeSut = (): SutTypes => {
  const addUserRepositoryStub = mockAddUserRepository();
  const hasherStub = mockHasher();
  const loadUserByEmailRepositoryStub = mockLoadUserByEmailRepository();
  jest
    .spyOn(loadUserByEmailRepositoryStub, "loadUserByEmail")
    .mockReturnValue(Promise.resolve(null));
  const sut = new DbAddUser(
    hasherStub,
    addUserRepositoryStub,
    loadUserByEmailRepositoryStub
  );
  return {
    sut,
    hasherStub,
    addUserRepositoryStub,
    loadUserByEmailRepositoryStub,
  };
};

describe("DbAddUser Usecase", () => {
  test("Should call Hasher with correct password", async () => {
    const { sut, hasherStub } = makeSut();
    const hasherSpy = jest.spyOn(hasherStub, "hash");
    await sut.add(mockAddUserParams());
    expect(hasherSpy).toHaveBeenCalledWith("any_password");
  });

  test("Should throw if Hasher throws", async () => {
    const { sut, hasherStub } = makeSut();
    jest.spyOn(hasherStub, "hash").mockImplementationOnce(throwError);
    const promise = sut.add(mockAddUserParams());
    await expect(promise).rejects.toThrow();
  });

  test("Should call AddUserRepository with correct values", async () => {
    const { sut, addUserRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addUserRepositoryStub, "add");
    await sut.add(mockAddUserParams());
    expect(addSpy).toHaveBeenCalledWith({
      name: "any_name",
      email: "any_email@mail.com",
      password: "hashed_password",
    });
  });

  test("Should throw if AddUserRepository throws", async () => {
    const { sut, addUserRepositoryStub } = makeSut();
    jest.spyOn(addUserRepositoryStub, "add").mockImplementationOnce(throwError);
    const promise = sut.add(mockAddUserParams());
    await expect(promise).rejects.toThrow();
  });

  test("Should return an user on success", async () => {
    const { sut } = makeSut();
    const user = await sut.add(mockAddUserParams());
    expect(user).toEqual(mockUserModel());
  });

  test("Should return null if loadUserByEmailRepository return an user", async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(loadUserByEmailRepositoryStub, "loadUserByEmail")
      .mockReturnValueOnce(Promise.resolve(mockUserModel()));
    const user = await sut.add(mockAddUserParams());
    expect(user).toBe(null);
  });

  test("Should calls loadUserByEmailRepository with correct email", async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut();
    const loadUserByEmailSpy = jest.spyOn(
      loadUserByEmailRepositoryStub,
      "loadUserByEmail"
    );
    await sut.add(mockAddUserParams());
    expect(loadUserByEmailSpy).toHaveBeenCalledWith("any_email@mail.com");
  });
});
