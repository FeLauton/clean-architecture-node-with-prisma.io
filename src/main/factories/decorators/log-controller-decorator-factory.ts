import { LogPrismaRepository } from "infra/db/prisma/log-prisma-repository";
import { LogControllerDecorator } from "main/decorators/log-controller-decorator";
import { Controller } from "presentation/protocols/controller";

export const makeLogControllerDecorator = (
  controller: Controller
): Controller => {
  const logPrismaRepository = new LogPrismaRepository();
  return new LogControllerDecorator(controller, logPrismaRepository);
};
