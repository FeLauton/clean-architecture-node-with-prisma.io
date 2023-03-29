import { AccountPrismaRepository, Prisma } from "infra/db/prisma";
import { mockAddAccountParams } from "tests/domain/mocks";

const mockAccountId = async (
  accessToken?: string,
  role?: string
): Promise<string> => {
  const insertedAccount = await Prisma.accounts.create({
    data: {
      ...mockAddAccountParams(),
      token: accessToken,
      role,
    },
  });
  return String(insertedAccount.id);
};

const findOneAccountById = async (accountId: string) => {
  return await Prisma.accounts.findUnique({ where: { id: Number(accountId) } });
};

const makeSut = (): AccountPrismaRepository => {
  return new AccountPrismaRepository();
};

describe("Account Prisma Repository", () => {
  beforeAll(async () => {
    await Prisma.$connect();
  });
  beforeEach(async () => {
    await Prisma.accounts.deleteMany();
  });

  afterAll(async () => {
    await Prisma.$disconnect();
  });

  describe("add()", () => {
    test("Should return an account on add success", async () => {
      const sut = makeSut();
      const account = await sut.add(mockAddAccountParams());
      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe("any_name");
      expect(account.email).toBe("any_email@mail.com");
      expect(account.password).toBe("any_password");
    });
  });

  describe("loadAccountByEmail()", () => {
    test("Should return an account on loadAccountByEmail success", async () => {
      const sut = makeSut();
      await mockAccountId();
      const account = await sut.loadAccountByEmail("any_email@mail.com");
      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe("any_name");
      expect(account.email).toBe("any_email@mail.com");
      expect(account.password).toBe("any_password");
    });

    test("Should return null if loadAccountByEmail fails", async () => {
      const sut = makeSut();
      const account = await sut.loadAccountByEmail("any_email@mail.com");
      expect(account).toBeFalsy();
    });
  });

  describe("updateAccessToken()", () => {
    test("Should update the account accessToken on updateAccessToken", async () => {
      const sut = makeSut();
      const accountId = await mockAccountId();
      let account = await findOneAccountById(accountId);
      expect(account?.token).toBeFalsy();
      await sut.updateAccessToken(accountId, "any_token");
      account = await findOneAccountById(accountId);
      expect(account).toBeTruthy();
      expect(account?.token).toBe("any_token");
    });
  });

  describe("loadAccountByToken()", () => {
    // test("Should return an account on loadAccountByToken success without role", async () => {
    //   const sut = makeSut();
    //   await mockAccountId("any_token");
    //   const account = await sut.loadAccountByToken("any_token");
    //   expect(account).toBeTruthy();
    //   expect(account.id).toBeTruthy();
    //   expect(account.name).toBe("any_name");
    //   expect(account.email).toBe("any_email@mail.com");
    //   expect(account.password).toBe("any_password");
    // });

    test("Should return an account on loadAccountByToken success with admin token", async () => {
      const sut = makeSut();
      await mockAccountId("any_token", "admin");
      const account = await sut.loadAccountByToken("any_token", "admin");
      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe("any_name");
      expect(account.email).toBe("any_email@mail.com");
      expect(account.password).toBe("any_password");
    });

    test("Should return an account on loadAccountByToken if user is admin", async () => {
      const sut = makeSut();
      await mockAccountId("any_token", "admin");
      const account = await sut.loadAccountByToken("any_token", "any_token");
      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe("any_name");
      expect(account.email).toBe("any_email@mail.com");
      expect(account.password).toBe("any_password");
    });

    test("Should return null on loadAccountByToken success with invalid token", async () => {
      const sut = makeSut();
      await mockAccountId("any_token");
      const account = await sut.loadAccountByToken("any_token", "admin");
      expect(account).toBeFalsy();
    });

    test("Should return null if loadAccountByToken fails", async () => {
      const sut = makeSut();
      const account = await sut.loadAccountByToken("any_token");
      expect(account).toBeFalsy();
    });
  });
});
