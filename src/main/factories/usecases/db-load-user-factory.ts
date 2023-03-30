import { DbLoadUserByToken } from "data/usecases";
import { LoadUserByToken } from "domain/usecases";
import { JwtAdapter } from "infra/criptography/jwt-adapter";
import { UserPrismaRepository } from "infra/db/prisma";
import { env } from "main/config/env";

export const makeDbLoadUserFactory = (): LoadUserByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountPrismaRepository = new UserPrismaRepository();
  return new DbLoadUserByToken(jwtAdapter, accountPrismaRepository);
};
