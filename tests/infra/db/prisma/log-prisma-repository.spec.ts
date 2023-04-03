import { LogPrismaRepository } from "infra/db/prisma/log-prisma-repository";
import { Prisma } from "infra/db/prisma/prisma-helper";

describe("Log Prisma Repository", () => {
  beforeAll(async () => {
    await Prisma.$connect();
  });
  beforeEach(async () => {
    await Prisma.errorLogs.deleteMany();
  });

  afterAll(async () => {
    await Prisma.$disconnect();
  });

  const makeSut = (): LogPrismaRepository => {
    return new LogPrismaRepository();
  };

  test("Should create an error log on success", async () => {
    const sut = makeSut();
    await sut.logError("any_error");
    const count = await Prisma.errorLogs.count();
    expect(count).toBe(1);
  });
});
