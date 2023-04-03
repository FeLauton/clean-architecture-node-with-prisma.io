import { UserModel } from "domain/models";

export type AddUserParams = Omit<UserModel, "id">;

export interface AddUser {
  add(user: AddUserParams): Promise<UserModel>;
}
