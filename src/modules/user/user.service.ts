import Database from "../../db";
import User from "./model/user.model";

class UserService {
  constructor(private readonly database: Database) {}

  async createUser(
    name: string,
    email: string,
    password: string,
    role: "admin" | "user"
  ): Promise<User | null> {
    const sql = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?);`;
    try {
      const result = await this.database.query(sql, [name, email, password]);
      console.log("Usuário criado com sucesso.");

      return new User(
        result.insertId,
        name,
        email,
        password,
        role,
        new Date(),
        new Date()
      );
    } catch (error: any) {
      console.error("Erro ao criar usuário:", error);
      throw new Error(`Não foi possível criar o usuário: ${error.message}`);
    }
  }

  async getUsers(): Promise<User[]> {
    const sql = "SELECT * FROM users;";
    try {
      const users = await this.database.query(sql);
      return users.map(
        (user: any) =>
          new User(
            user.id,
            user.name,
            user.email,
            user.password,
            user.role,
            new Date(user.created_at),
            new Date(user.updated_at)
          )
      );
    } catch (error: any) {
      console.error("Erro ao buscar usuários:", error);
      throw new Error(`Não foi possível buscar os usuários: ${error.message}`);
    }
  }

  async getUserById(id: number): Promise<User | null> {
    const sql = "SELECT * FROM users WHERE id = ?;";
    try {
      const result = await this.database.query(sql, [id]);
      if (result.length > 0) {
        const user = result[0];
        return new User(
          user.id,
          user.name,
          user.email,
          user.password,
          user.role,
          new Date(user.created_at),
          new Date(user.updated_at)
        );
      } else {
        console.warn(`Usuário com ID ${id} não encontrado.`);
        return null;
      }
    } catch (error: any) {
      console.error(`Erro ao buscar usuário com ID ${id}:`, error);
      throw new Error(`Não foi possível buscar o usuário: ${error.message}`);
    }
  }
}

export default UserService;
