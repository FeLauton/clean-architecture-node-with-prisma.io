import { LogErrorRepository } from "data/protocols/db/log-error-repository";
import { Prisma } from "./prisma-helper";

export class LogPrismaRepository implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    await Prisma.logs.create({
      data: { stack: stack, created_at: new Date() },
    });
  }
}
