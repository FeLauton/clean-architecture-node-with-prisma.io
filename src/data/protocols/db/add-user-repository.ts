import { UserModel } from "domain/models/user";
import { AddUserParams } from "domain/usecases";

export interface AddUserRepository {
  add(accountData: AddUserParams): Promise<UserModel>;
}
