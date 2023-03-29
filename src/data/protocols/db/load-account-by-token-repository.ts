import { AccountModel } from "domain/models/account";

export interface LoadAccountByTokenRepository {
  loadAccountByToken(token: string, role?: string): Promise<AccountModel>;
}
