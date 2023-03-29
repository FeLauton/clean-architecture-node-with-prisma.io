import { AuthenticationModel } from "domain/models/authentication";

export interface Authentication {
  auth(authentication: AuthenticationParams): Promise<AuthenticationModel>;
}

export interface AuthenticationParams {
  email: string;
  password: string;
}
