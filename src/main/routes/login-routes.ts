import { Router } from "express";
import { adaptRoute } from "main/adapters/express-route-adapter";
import { makeLoginController } from "main/factories/controllers/login-controller-factory";
import { makeSignUpController } from "main/factories/controllers/signup-controller-factory";

export default (router: Router): void => {
  router.post("/signup", adaptRoute(makeSignUpController()));
  router.post("/login", adaptRoute(makeLoginController()));
};
