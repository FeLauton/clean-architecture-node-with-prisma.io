import bcrypt from "bcrypt";
import { BcryptAdapter } from "infra/criptography/encrypt-adapter";
import { throwError } from "tests/domain/mocks";

jest.mock("bcrypt", () => ({
  async hash(): Promise<string> {
    return Promise.resolve("hash");
  },
  async compare(value: string, hash: string): Promise<boolean> {
    return Promise.resolve(true);
  },
}));

const salt = 12;
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt);
};

describe("Bcrypt Adapter", () => {
  describe("hash()", () => {
    test("Should call hash with correct values", async () => {
      const sut = makeSut();
      const hashSpy = jest.spyOn(bcrypt, "hash");
      await sut.hash("any_value");
      expect(hashSpy).toHaveBeenCalledWith("any_value", salt);
    });

    test("Should return a hash on success", async () => {
      const sut = makeSut();
      const hash = await sut.hash("any_value");
      expect(hash).toBe("hash");
    });

    test("Should throw if hash throws", async () => {
      const sut = makeSut();
      jest.spyOn(bcrypt, "hash").mockImplementationOnce(throwError);
      const promise = sut.hash("any_value");
      await expect(promise).rejects.toThrow();
    });
  });
  describe("compare()", () => {
    test("Should call compare with correct values", async () => {
      const sut = makeSut();
      const compareSpy = jest.spyOn(bcrypt, "compare");
      await sut.compare("any_value", "any_hash");
      expect(compareSpy).toHaveBeenCalledWith("any_value", "any_hash");
    });

    test("Should return a true on success", async () => {
      const sut = makeSut();
      const compare = await sut.compare("any_value", "hashed_value");
      expect(compare).toBe(true);
    });

    test("Should throw if compare throws", async () => {
      const sut = makeSut();
      jest.spyOn(bcrypt, "compare").mockImplementationOnce(throwError);
      const promise = sut.compare("any_value", "any_hash");
      await expect(promise).rejects.toThrow();
    });
  });
});
