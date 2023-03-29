import { AddAccountRepository } from "data/protocols/db/add-account-repository";
import { LoadAccountByEmailRepository } from "data/protocols/db/load-account-by-email-repository";
import { LoadAccountByTokenRepository } from "data/protocols/db/load-account-by-token-repository";
import { UpdateAccessTokenRepository } from "data/protocols/db/update-access-token-repository";
import { AccountModel } from "domain/models/account";
import { AddAccountParams } from "domain/usecases/add-account";
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
