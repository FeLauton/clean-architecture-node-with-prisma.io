import {
  AddUserRepository,
  LoadUserByEmailRepository,
  LoadUserByTokenRepository,
  UpdateAccessTokenRepository,
} from "data/protocols/db";
import { UserModel } from "domain/models/user";
import { AddUserParams } from "domain/usecases";
import { Prisma, PrismaHelper } from "infra/db/prisma";

export class UserPrismaRepository
  implements
    AddUserRepository,
    LoadUserByEmailRepository,
    UpdateAccessTokenRepository,
    LoadUserByTokenRepository
{
  async add(accountData: AddUserParams): Promise<UserModel> {
    const user = await Prisma.users.create({
      data: accountData,
    });
    return user && PrismaHelper.userMap(user);
  }

  async loadUserByEmail(email: string): Promise<UserModel> {
    const user = await Prisma.users.findFirst({
      where: { email },
    });
    return user && PrismaHelper.userMap(user);
  }

  async updateAccessToken(id: string, token: string): Promise<void> {
    await Prisma.users.update({
      where: { id: Number(id) },
      data: { token },
    });
  }

  async loadUserByToken(token: string, role?: string): Promise<UserModel> {
    const user = await Prisma.users.findFirst({
      where: {
        token,
        OR: [
          {
            role: "user",
          },
          { role: "admin" },
        ],
      },
    });

    return user && PrismaHelper.userMap(user);
  }
}
