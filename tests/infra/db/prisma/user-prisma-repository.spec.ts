import { Prisma, UserPrismaRepository } from "infra/db/prisma";
import { mockAddUserParams } from "tests/domain/mocks";

const mockUserId = async (
  accessToken?: string,
  role?: string
): Promise<string> => {
  const insertedUser = await Prisma.users.create({
    data: {
      ...mockAddUserParams(),
      token: accessToken,
      role,
    },
  });
  return String(insertedUser.id);
};

const findOneUserById = async (accountId: string) => {
  return await Prisma.users.findUnique({ where: { id: Number(accountId) } });
};

const makeSut = (): UserPrismaRepository => {
  return new UserPrismaRepository();
};

describe("user Prisma Repository", () => {
  beforeAll(async () => {
    await Prisma.$connect();
  });
  beforeEach(async () => {
    await Prisma.users.deleteMany();
  });

  afterAll(async () => {
    await Prisma.$disconnect();
  });

  describe("add()", () => {
    test("Should return an user on add success", async () => {
      const sut = makeSut();
      const user = await sut.add(mockAddUserParams());
      expect(user).toBeTruthy();
      expect(user.id).toBeTruthy();
      expect(user.name).toBe("any_name");
      expect(user.email).toBe("any_email@mail.com");
      expect(user.password).toBe("any_password");
    });
  });

  describe("loadUserByEmail()", () => {
    test("Should return an user on loadUserByEmail success", async () => {
      const sut = makeSut();
      await mockUserId();
      const user = await sut.loadUserByEmail("any_email@mail.com");
      expect(user).toBeTruthy();
      expect(user.id).toBeTruthy();
      expect(user.name).toBe("any_name");
      expect(user.email).toBe("any_email@mail.com");
      expect(user.password).toBe("any_password");
    });

    test("Should return null if loadUserByEmail fails", async () => {
      const sut = makeSut();
      const user = await sut.loadUserByEmail("any_email@mail.com");
      expect(user).toBeFalsy();
    });
  });

  describe("updateAccessToken()", () => {
    test("Should update the user accessToken on updateAccessToken", async () => {
      const sut = makeSut();
      const accountId = await mockUserId();
      let user = await findOneUserById(accountId);
      expect(user?.token).toBeFalsy();
      await sut.updateAccessToken(accountId, "any_token");
      user = await findOneUserById(accountId);
      expect(user).toBeTruthy();
      expect(user?.token).toBe("any_token");
    });
  });

  describe("loadUserByToken()", () => {
    // test("Should return an user on loadUserByToken success without role", async () => {
    //   const sut = makeSut();
    //   await mockUserId("any_token");
    //   const user = await sut.loadUserByToken("any_token");
    //   expect(user).toBeTruthy();
    //   expect(user.id).toBeTruthy();
    //   expect(user.name).toBe("any_name");
    //   expect(user.email).toBe("any_email@mail.com");
    //   expect(user.password).toBe("any_password");
    // });

    test("Should return an user on loadUserByToken success with admin token", async () => {
      const sut = makeSut();
      await mockUserId("any_token", "admin");
      const user = await sut.loadUserByToken("any_token", "admin");
      expect(user).toBeTruthy();
      expect(user.id).toBeTruthy();
      expect(user.name).toBe("any_name");
      expect(user.email).toBe("any_email@mail.com");
      expect(user.password).toBe("any_password");
    });

    test("Should return an user on loadUserByToken if user is admin", async () => {
      const sut = makeSut();
      await mockUserId("any_token", "admin");
      const user = await sut.loadUserByToken("any_token", "any_token");
      expect(user).toBeTruthy();
      expect(user.id).toBeTruthy();
      expect(user.name).toBe("any_name");
      expect(user.email).toBe("any_email@mail.com");
      expect(user.password).toBe("any_password");
    });

    test("Should return null on loadUserByToken success with invalid token", async () => {
      const sut = makeSut();
      await mockUserId("any_token");
      const user = await sut.loadUserByToken("any_token", "admin");
      expect(user).toBeFalsy();
    });

    test("Should return null if loadUserByToken fails", async () => {
      const sut = makeSut();
      const user = await sut.loadUserByToken("any_token");
      expect(user).toBeFalsy();
    });
  });
});
