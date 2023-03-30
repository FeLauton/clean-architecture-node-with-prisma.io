import { UserModel } from "domain/models/user";

export interface LoadUserByTokenRepository {
  loadUserByToken(token: string, role?: string): Promise<UserModel>;
}
