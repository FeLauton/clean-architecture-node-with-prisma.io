import { makeDbLoadAccountFactory } from "main/factories/usecases/db-load-account-factory";
import { AuthMiddleware } from "presentation/middlewares/auth-middleware";
import { Middleware } from "presentation/protocols/middleware";
export const makeAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountFactory(), role);
};
