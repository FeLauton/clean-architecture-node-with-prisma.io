import { DbAddUser } from "data/usecases";
import { makeDbAddUserFactory } from "main/factories/usecases";

describe("makeDbAddUserFactory", () => {
  test("should return a DbAddUser instance", () => {
    const result = makeDbAddUserFactory();
    expect(result).toBeInstanceOf(DbAddUser);
  });
});
