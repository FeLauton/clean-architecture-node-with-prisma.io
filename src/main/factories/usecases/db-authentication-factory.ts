import { DbAuthentication } from "data/usecases";
import { Authentication } from "domain/usecases";
import { BcryptAdapter } from "infra/criptography/encrypt-adapter";
import { JwtAdapter } from "infra/criptography/jwt-adapter";
import { UserPrismaRepository } from "infra/db/prisma";
import { env } from "main/config/env";

export const makeDbAuthenticationFactory = (): Authentication => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountPrismaRepository = new UserPrismaRepository();
  return new DbAuthentication(
    accountPrismaRepository,
    bcryptAdapter,
    jwtAdapter,
    accountPrismaRepository
  );
};
