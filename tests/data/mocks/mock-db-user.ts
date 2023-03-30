import {
  AddUserRepository,
  LoadUserByTokenRepository,
  UpdateAccessTokenRepository,
} from "data/protocols/db";
import { AddUserParams, LoadUserByEmailRepository } from "data/usecases";
import { UserModel } from "domain/models/user";
import { mockUserModel } from "tests/domain/mocks";

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

export const mockAddUserRepository = (): AddUserRepository => {
  class AddUserRepositoryStub implements AddUserRepository {
    async add(accountData: AddUserParams): Promise<UserModel> {
      return Promise.resolve(mockUserModel());
    }
  }
  return new AddUserRepositoryStub();
};

export const mockLoadUserByEmailRepository = (): LoadUserByEmailRepository => {
  class LoadUserByEmailRepositoryStub implements LoadUserByEmailRepository {
    async loadUserByEmail(email: string): Promise<UserModel> {
      return Promise.resolve(mockUserModel());
    }
  }
  return new LoadUserByEmailRepositoryStub();
};

export const mockLoadUserByTokenRepository = (): LoadUserByTokenRepository => {
  class LoadUserByEmailRepositoryStub implements LoadUserByTokenRepository {
    loadUserByToken(token: string): Promise<UserModel> {
      return Promise.resolve(mockUserModel());
    }
  }
  return new LoadUserByEmailRepositoryStub();
};
