import { IUser } from "../types";

class UserModel implements IUser {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public readonly password: string;
  public readonly role?: "admin" | "user" = "user";
  public readonly created_at: Date;
  public readonly updated_at: Date;
  public readonly totalBooksRented?: number = 0;

  constructor(data: IUser) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
    this.totalBooksRented = data.totalBooksRented ?? 0;
  }
}

export default UserModel;
