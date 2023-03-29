import app from "main/config/app";
import request from "supertest";

describe("Body Parser Middleware", () => {
  test("Should parse body as json", async () => {
    app.post("/test_body_parser", (request, response) => {
      response.send(request.body);
    });
    await request(app)
      .post("/test_body_parser")
      .send({ name: "Fellipe" })
      .expect({ name: "Fellipe" });
  });
});
