import { LogErrorRepository } from "data/protocols/db";
import { Prisma } from "./prisma-helper";

export class LogPrismaRepository implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    await Prisma.errorLogs.create({
      data: { stack: stack, created_at: new Date() },
    });
  }
}
