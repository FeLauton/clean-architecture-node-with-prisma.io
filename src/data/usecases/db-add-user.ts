import {
  AddUser,
  AddUserParams,
  AddUserRepository,
  Hasher,
  LoadUserByEmailRepository,
  UserModel,
} from "./db-add-user-protocols";

export class DbAddUser implements AddUser {
  constructor(
    private readonly hasher: Hasher,
    private readonly addUserRepository: AddUserRepository,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository
  ) {}
  async add(accountData: AddUserParams): Promise<UserModel> {
    const user = await this.loadUserByEmailRepository.loadUserByEmail(
      accountData.email
    );
    if (!user) {
      const hashedPassword = await this.hasher.hash(accountData.password);
      const newUser = await this.addUserRepository.add(
        Object.assign({}, accountData, { password: hashedPassword })
      );
      return newUser;
    }
    return null;
  }
}
