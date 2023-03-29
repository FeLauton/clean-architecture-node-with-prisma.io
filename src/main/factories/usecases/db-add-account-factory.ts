import { DbAddAccount } from "data/usecases";
import { AddAccount } from "domain/usecases";
import { BcryptAdapter } from "infra/criptography/encrypt-adapter";
import { AccountPrismaRepository } from "infra/db/prisma";

export const makeDbAddAccountFactory = (): AddAccount => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountPrismaRepository = new AccountPrismaRepository();
  return new DbAddAccount(
    bcryptAdapter,
    accountPrismaRepository,
    accountPrismaRepository
  );
};
