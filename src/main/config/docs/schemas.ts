import {
  accountSchema,
  errorSchema,
  loginParamsSchema,
  signUpParamsSchema,
} from "./schemas/";

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  signUpParams: signUpParamsSchema,
  error: errorSchema,
};
