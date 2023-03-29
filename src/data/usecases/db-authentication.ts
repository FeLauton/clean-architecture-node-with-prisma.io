import { Encrypter } from "data/protocols/criptography/encrypter";
import { HashComparer } from "data/protocols/criptography/hash-compare";
import { LoadAccountByEmailRepository } from "data/protocols/db/load-account-by-email-repository";
import { AuthenticationModel } from "domain/models/authentication";
import {
  Authentication,
  AuthenticationParams,
} from "domain/usecases/authentication";
import { UpdateAccessTokenRepository } from "src/data/protocols/db/update-access-token-repository";

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparerHashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}
  async auth(
    authentication: AuthenticationParams
  ): Promise<AuthenticationModel> {
    const account = await this.loadAccountByEmailRepository.loadAccountByEmail(
      authentication.email
    );
    if (account) {
      const isValid = await this.hashComparerHashComparer.compare(
        authentication.password,
        account.password
      );
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id);
        await this.updateAccessTokenRepository.updateAccessToken(
          account.id,
          accessToken
        );
        return { accessToken, name: account.name };
      }
    }
    return null;
  }
}
