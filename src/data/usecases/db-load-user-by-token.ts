import { Decrypter } from "data/protocols/criptography";
import { LoadUserByTokenRepository } from "data/protocols/db";
import { LoadUserByToken } from "domain/usecases";
import { UserModel } from "./db-add-user-protocols";

export class DbLoadUserByToken implements LoadUserByToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly loadUserByTokenRepository: LoadUserByTokenRepository
  ) {}
  async load(accessToken: string, role?: string): Promise<UserModel> {
    let token: string;
    try {
      token = await this.decrypter.decrypt(accessToken);
    } catch (error) {
      return null;
    }

    if (token) {
      const user = await this.loadUserByTokenRepository.loadUserByToken(
        accessToken,
        role
      );
      if (user) {
        return user;
      }
    }
    return null;
  }
}
