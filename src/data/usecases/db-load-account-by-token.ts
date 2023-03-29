import { Decrypter } from "data/protocols/criptography/decrypter";
import { LoadAccountByTokenRepository } from "data/protocols/db/load-account-by-token-repository";
import { LoadAccountByToken } from "domain/usecases/load-account-by-token";
import { AccountModel } from "./db-add-account-protocols";

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}
  async load(accessToken: string, role?: string): Promise<AccountModel> {
    let token: string;
    try {
      token = await this.decrypter.decrypt(accessToken);
    } catch (error) {
      return null;
    }

    if (token) {
      const account =
        await this.loadAccountByTokenRepository.loadAccountByToken(
          accessToken,
          role
        );
      if (account) {
        return account;
      }
    }
    return null;
  }
}
