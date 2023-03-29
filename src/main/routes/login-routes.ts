import { Router } from "express";
import { adaptRoute } from "main/adapters/express-route-adapter";
import {
  makeLoginController,
  makeSignUpController,
} from "main/factories/controllers";

export default (router: Router): void => {
  router.post("/signup", adaptRoute(makeSignUpController()));
  router.post("/login", adaptRoute(makeLoginController()));
};
