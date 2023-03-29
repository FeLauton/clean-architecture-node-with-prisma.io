import { DbLoadAccountByToken } from "data/usecases/db-load-account-by-token";
import { LoadAccountByToken } from "domain/usecases/load-account-by-token";
import { JwtAdapter } from "infra/criptography/jwt-adapter";
import { AccountPrismaRepository } from "infra/db/prisma";
import { env } from "main/config/env";

export const makeDbLoadAccountFactory = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountPrismaRepository = new AccountPrismaRepository();
  return new DbLoadAccountByToken(jwtAdapter, accountPrismaRepository);
};
