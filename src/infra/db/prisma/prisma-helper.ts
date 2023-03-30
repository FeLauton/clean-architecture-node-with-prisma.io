import { PrismaClient, users } from "@prisma/client";
import { UserModel } from "domain/models/user";

export const Prisma = new PrismaClient();

export const PrismaHelper = {
  userMap: (user: users): UserModel => {
    const { id, role, token, ...rest } = user;
    return { id: String(id), ...rest };
  },
};
