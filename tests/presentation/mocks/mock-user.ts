import { AuthenticationModel } from "domain/models/authentication";
import { UserModel } from "domain/models/user";
import {
  AddUser,
  AddUserParams,
  Authentication,
  AuthenticationParams,
  LoadUserByToken,
} from "domain/usecases";
import { mockUserModel } from "tests/domain/mocks";

export const mockAuthentication = () => {
  class AuthenticationStub implements Authentication {
    async auth(
      authentication: AuthenticationParams
    ): Promise<AuthenticationModel> {
      return { accessToken: "any_token", name: "any_name" };
    }
  }
  return new AuthenticationStub();
};

export const mockAddUser = (): AddUser => {
  class AddUserStub implements AddUser {
    async add(user: AddUserParams): Promise<UserModel> {
      return Promise.resolve(mockUserModel());
    }
  }
  return new AddUserStub();
};

export const mockLoadUserByToken = (): LoadUserByToken => {
  class LoadUserByTokenStub implements LoadUserByToken {
    async load(
      accessToken: string,
      role?: string | undefined
    ): Promise<UserModel> {
      return Promise.resolve(mockUserModel());
    }
  }
  return new LoadUserByTokenStub();
};
