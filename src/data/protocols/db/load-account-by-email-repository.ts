import { AccountModel } from "domain/models/account";

export interface LoadAccountByEmailRepository {
  loadAccountByEmail(email: string): Promise<AccountModel>;
}
