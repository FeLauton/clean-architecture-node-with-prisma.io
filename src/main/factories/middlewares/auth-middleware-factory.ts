import { makeDbLoadUserFactory } from "main/factories/usecases";
import { AuthMiddleware } from "presentation/middlewares/auth-middleware";
import { Middleware } from "presentation/protocols";

export const makeAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(makeDbLoadUserFactory(), role);
};
