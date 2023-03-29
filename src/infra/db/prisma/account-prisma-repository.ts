import {
  AddAccountRepository,
  LoadAccountByEmailRepository,
  LoadAccountByTokenRepository,
  UpdateAccessTokenRepository,
} from "data/protocols/db";
import { AccountModel } from "domain/models/account";
import { AddAccountParams } from "domain/usecases";
import { Prisma, PrismaHelper } from "infra/db/prisma";

export class AccountPrismaRepository
  implements
    AddAccountRepository,
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository,
    LoadAccountByTokenRepository
{
  async add(accountData: AddAccountParams): Promise<AccountModel> {
    const account = await Prisma.accounts.create({
      data: accountData,
    });
    return account && PrismaHelper.accountMap(account);
  }

  async loadAccountByEmail(email: string): Promise<AccountModel> {
    const account = await Prisma.accounts.findFirst({
      where: { email },
    });
    return account && PrismaHelper.accountMap(account);
  }

  async updateAccessToken(id: string, token: string): Promise<void> {
    await Prisma.accounts.update({
      where: { id: Number(id) },
      data: { token },
    });
  }

  async loadAccountByToken(
    token: string,
    role?: string
  ): Promise<AccountModel> {
    const account = await Prisma.accounts.findFirst({
      where: {
        token,
        OR: [
          {
            role,
          },
          { role: "admin" },
        ],
      },
    });

    return account && PrismaHelper.accountMap(account);
  }
}
