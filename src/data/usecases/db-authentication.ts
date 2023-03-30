import { Encrypter, HashComparer } from "data/protocols/criptography";
import {
  LoadUserByEmailRepository,
  UpdateAccessTokenRepository,
} from "data/protocols/db";
import { AuthenticationModel } from "domain/models/authentication";
import { Authentication, AuthenticationParams } from "domain/usecases";

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hashComparerHashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}
  async auth(
    authentication: AuthenticationParams
  ): Promise<AuthenticationModel> {
    const user = await this.loadUserByEmailRepository.loadUserByEmail(
      authentication.email
    );
    if (user) {
      const isValid = await this.hashComparerHashComparer.compare(
        authentication.password,
        user.password
      );
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(user.id);
        await this.updateAccessTokenRepository.updateAccessToken(
          user.id,
          accessToken
        );
        return { accessToken, name: user.name };
      }
    }
    return null;
  }
}
