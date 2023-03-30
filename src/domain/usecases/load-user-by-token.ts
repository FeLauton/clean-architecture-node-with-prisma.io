import { UserModel } from "domain/models/user";

export interface LoadUserByToken {
  load(accessToken: string, role?: string): Promise<UserModel>;
}
