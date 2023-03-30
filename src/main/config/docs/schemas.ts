import {
  accountSchema,
  errorSchema,
  loginParamsSchema,
  signUpParamsSchema,
} from "./schemas/";

export default {
  user: accountSchema,
  loginParams: loginParamsSchema,
  signUpParams: signUpParamsSchema,
  error: errorSchema,
};
