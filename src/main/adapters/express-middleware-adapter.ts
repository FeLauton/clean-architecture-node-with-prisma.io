import { NextFunction, Request, Response } from "express";
import { HttpRequest } from "presentation/protocols";
import { Middleware } from "presentation/protocols/middleware";

export const adaptMiddleware = (middleware: Middleware) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      headers: request.headers,
    };
    const httpResponse = await middleware.handle(httpRequest);
    if (httpResponse.statusCode === 200) {
      Object.assign(request, httpResponse.body);
      next();
    } else {
      response.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
      });
    }
  };
};
