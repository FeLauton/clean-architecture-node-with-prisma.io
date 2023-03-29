import { AccountModel } from "domain/models/account";
import { AuthenticationModel } from "domain/models/authentication";
import { AddAccount, AddAccountParams } from "domain/usecases/add-account";
import {
  Authentication,
  AuthenticationParams,
} from "domain/usecases/authentication";
import { LoadAccountByToken } from "domain/usecases/load-account-by-token";
import { mockAccountModel } from "tests/domain/mocks";

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

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add(account: AddAccountParams): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel());
    }
  }
  return new AddAccountStub();
};

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load(
      accessToken: string,
      role?: string | undefined
    ): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel());
    }
  }
  return new LoadAccountByTokenStub();
};
