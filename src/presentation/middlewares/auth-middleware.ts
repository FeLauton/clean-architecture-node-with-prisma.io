import { LoadUserByToken } from "domain/usecases";
import { AccessDeniedError } from "presentation/errors";
import { forbidden, ok, serverError } from "presentation/helpers";
import { HttpRequest, HttpResponse, Middleware } from "presentation/protocols";
export class AuthMiddleware implements Middleware {
  constructor(
    private readonly loadUserByToken: LoadUserByToken,
    private readonly role?: string
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.["x-access-token"];
      if (accessToken) {
        const user = await this.loadUserByToken.load(accessToken, this.role);
        if (user) {
          return ok({ accountId: user.id });
        }
      }
      return forbidden(new AccessDeniedError());
    } catch (error) {
      return serverError(error);
    }
  }
}
