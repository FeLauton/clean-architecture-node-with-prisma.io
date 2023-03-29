import { DbAuthentication } from "data/usecases";
import { Authentication } from "domain/usecases";
import { BcryptAdapter } from "infra/criptography/encrypt-adapter";
import { JwtAdapter } from "infra/criptography/jwt-adapter";
import { AccountPrismaRepository } from "infra/db/prisma";
import { env } from "main/config/env";

export const makeDbAuthenticationFactory = (): Authentication => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountPrismaRepository = new AccountPrismaRepository();
  return new DbAuthentication(
    accountPrismaRepository,
    bcryptAdapter,
    jwtAdapter,
    accountPrismaRepository
  );
};
