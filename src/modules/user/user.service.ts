import Repository from "src/repository";
import User from "./model/user.model";
import { v4 as uuidv4 } from "uuid";
import { CreateUserType, FilterTypes, UpdateUserType } from "./types";
import Utils from "src/utils";

class UserService {
  constructor(
    private readonly repository: Repository<User> = new Repository<User>(
      "users"
    )
  ) {}

  createUser(data: CreateUserType): User {
    const newUser = new User({
      ...data,
      id: uuidv4(),
      created_at: new Date(),
      updated_at: new Date(),
    });

    const createdUser = this.repository.createData(newUser);

    return createdUser;
  }

  findAllUsers(filter?: FilterTypes): User[] {
    const users = this.repository.findAll();

    if (filter) {
      return users.filter(filter).map((user) => new User(user));
    }

    return users.map((user) => new User(user));
  }

  findUserById(id: string): User | null {
    const result = this.repository.findById(id);
    if (!result) {
      console.error(`Usuário com ID ${id} não encontrado`);
      return null;
    }

    const user = new User(result);
    return user;
  }

  updateUser({ id, update }: UpdateUserType): User {
    const user = this.findUserById(id);
    if (!user) {
      throw new Error(`Usuário com ID ${id} não encontrado`);
    }

    const validateFields = Utils.validateEmptyFields(update);

    const updatedUser = new User({
      ...user,
      ...validateFields,
      updated_at: new Date(),
    });

    const result = this.repository.updateData(id, updatedUser);

    return result;
  }

  deleteUser(id: string): User | null {
    const user = this.findUserById(id);
    if (!user) {
      return null;
    }

    this.repository.deleteData(id);
    return user;
  }
}

export default UserService;
