import User from "../model/user.model";

export type FilterTypes = (user: User) => boolean;

export interface CreateUserType {
  name: string;
  email: string;
  password: string;
  role?: "admin" | "user";
}

export type UpdateUserType = {
  id: string;
  update: Partial<User>;
};

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role?: "admin" | "user";
  created_at: Date;
  updated_at: Date;
  totalBooksRented?: number;
}
