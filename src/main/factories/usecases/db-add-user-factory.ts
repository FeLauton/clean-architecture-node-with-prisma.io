import { DbAddUser } from "data/usecases";
import { AddUser } from "domain/usecases";
import { BcryptAdapter } from "infra/criptography/encrypt-adapter";
import { UserPrismaRepository } from "infra/db/prisma";

export const makeDbAddUserFactory = (): AddUser => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountPrismaRepository = new UserPrismaRepository();
  return new DbAddUser(
    bcryptAdapter,
    accountPrismaRepository,
    accountPrismaRepository
  );
};
