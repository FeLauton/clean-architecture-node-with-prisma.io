import { AddAccountRepository } from "data/protocols/db/add-account-repository";
import { LoadAccountByTokenRepository } from "data/protocols/db/load-account-by-token-repository";
import { UpdateAccessTokenRepository } from "data/protocols/db/update-access-token-repository";
import {
  AddAccountParams,
  LoadAccountByEmailRepository,
} from "data/usecases/db-add-account-protocols";
import { AccountModel } from "domain/models/account";
import { mockAccountModel } from "tests/domain/mocks";

export const mockUpdateAccessTokenRepository =
  (): UpdateAccessTokenRepository => {
    class UpdateAccessTokenRepositoryStub
      implements UpdateAccessTokenRepository
    {
      async updateAccessToken(id: string, token: string): Promise<void> {
        return Promise.resolve();
      }
    }
    return new UpdateAccessTokenRepositoryStub();
  };

export const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(accountData: AddAccountParams): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel());
    }
  }
  return new AddAccountRepositoryStub();
};

export const mockLoadAccountByEmailRepository =
  (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub
      implements LoadAccountByEmailRepository
    {
      async loadAccountByEmail(email: string): Promise<AccountModel> {
        return Promise.resolve(mockAccountModel());
      }
    }
    return new LoadAccountByEmailRepositoryStub();
  };

export const mockLoadAccountByTokenRepository =
  (): LoadAccountByTokenRepository => {
    class LoadAccountByEmailRepositoryStub
      implements LoadAccountByTokenRepository
    {
      loadAccountByToken(token: string): Promise<AccountModel> {
        return Promise.resolve(mockAccountModel());
      }
    }
    return new LoadAccountByEmailRepositoryStub();
  };
