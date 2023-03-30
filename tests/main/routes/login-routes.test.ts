import { hash } from "bcrypt";
import app from "main/config/app";
import { Prisma } from "src/infra/db/prisma";
import request from "supertest";

describe("Login Routes", () => {
  beforeAll(async () => {
    await Prisma.$connect();
  });

  beforeEach(async () => {
    await Prisma.users.deleteMany();
  });

  afterAll(async () => {
    await Prisma.$disconnect();
  });

  describe("POST /signup", () => {
    test("Should return 200 on signup", async () => {
      await request(app)
        .post("/api/signup")
        .send({
          name: "Fellipe",
          email: "fellipe.lauton@gmail.com",
          password: "123",
          passwordConfirmation: "123",
        })
        .expect(200);
    });
  });
  describe("POST /login", () => {
    test("Should return 200 on login", async () => {
      const hashedPassword = await hash("123", 12);
      await Prisma.users.create({
        data: {
          name: "Fellipe",
          email: "fellipe.lauton@gmail.com",
          password: hashedPassword,
        },
      });
      await request(app)
        .post("/api/login")
        .send({
          email: "fellipe.lauton@gmail.com",
          password: "123",
        })
        .expect(200);
    });

    test("Should return 401 whit invalid credentials", async () => {
      await request(app)
        .post("/api/login")
        .send({
          email: "fellipe.lauton@gmail.com",
          password: "123",
        })
        .expect(401);
    });
  });
});
