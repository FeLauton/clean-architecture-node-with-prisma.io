import { accounts, PrismaClient } from "@prisma/client";
import { AccountModel } from "domain/models/account";

export const Prisma = new PrismaClient();

export const PrismaHelper = {
  accountMap: (account: accounts): AccountModel => {
    const { id, role, token, ...rest } = account;
    return { id: String(id), ...rest };
  },
};
