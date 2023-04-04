import {
  accountSchema,
  errorSchema,
  loginParamsSchema,
  productByCodeParamsSchema,
  signUpParamsSchema,
} from "./schemas/";

export default {
  user: accountSchema,
  loginParams: loginParamsSchema,
  signUpParams: signUpParamsSchema,
  productByCodeParams: productByCodeParamsSchema,
  error: errorSchema,
};
