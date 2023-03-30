import { DbLoadUserByToken } from "data/usecases";
import { makeDbLoadUserFactory } from "main/factories/usecases";

describe("makeDbLoadUserFactory", () => {
  test("should return a DbLoadUserByToken instance", () => {
    const result = makeDbLoadUserFactory();
    expect(result).toBeInstanceOf(DbLoadUserByToken);
  });
});
