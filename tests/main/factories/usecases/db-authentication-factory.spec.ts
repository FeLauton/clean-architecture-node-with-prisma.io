import { DbAuthentication } from "data/usecases";
import { makeDbAuthenticationFactory } from "main/factories/usecases";

describe("makeDbAuthenticationFactory", () => {
  test("should return a DbAuthentication instance", () => {
    const result = makeDbAuthenticationFactory();
    expect(result).toBeInstanceOf(DbAuthentication);
  });
});
