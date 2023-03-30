import { PrismaClient } from "@prisma/client";
import { DeepMockProxy, mockDeep, mockReset } from "jest-mock-extended";
import { Prisma } from "./src/infra/db/prisma";

jest.mock("./client", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = Prisma as unknown as DeepMockProxy<PrismaClient>;
