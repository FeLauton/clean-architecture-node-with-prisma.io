import {
  badRequest,
  forbidden,
  noContent,
  notFound,
  serverError,
  unauthorized,
} from "./components/";
import { apiKeyAuthSchema } from "./schemas/";

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema,
  },
  badRequest,
  serverError,
  unauthorized,
  notFound,
  forbidden,
  noContent,
};
