import { UserModel } from "domain/models/user";
import { AddUserParams, AuthenticationParams } from "domain/usecases";

export const mockUserModel = (): UserModel => ({
  id: "any_id",
  name: "any_name",
  email: "any_email@mail.com",
  password: "any_password",
});

export const mockAddUserParams = (): AddUserParams => ({
  name: "any_name",
  email: "any_email@mail.com",
  password: "any_password",
});

export const mockAuthenticationParams = (): AuthenticationParams => ({
  email: "any_email@mail.com",
  password: "any_password",
});
