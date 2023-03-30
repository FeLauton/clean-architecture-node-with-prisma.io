import { UserModel } from "domain/models/user";

export interface LoadUserByEmailRepository {
  loadUserByEmail(email: string): Promise<UserModel>;
}
