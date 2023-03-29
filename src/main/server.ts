require("module-alias/register");
import { Prisma } from "infra/db/prisma";
import { env } from "main/config/env";

Prisma.$connect()
  .then(async () => {
    const app = (await import("main/config/app")).default;
    app.listen(env.port, () => {
      console.log(`Running on http://localhost:${env.port}/`);
      console.log(`Docs on http://localhost:${env.port}/api-docs/`);
    });
  })
  .catch(console.error);
