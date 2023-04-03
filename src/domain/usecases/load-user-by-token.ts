import { UserModel } from "domain/models";

export interface LoadUserByToken {
  load(accessToken: string, role?: string): Promise<UserModel>;
}
