import { LogPrismaRepository } from "infra/db/prisma";
import { LogControllerDecorator } from "main/decorators/log-controller-decorator";
import { Controller } from "presentation/protocols";

export const makeLogControllerDecorator = (
  controller: Controller
): Controller => {
  const logPrismaRepository = new LogPrismaRepository();
  return new LogControllerDecorator(controller, logPrismaRepository);
};
