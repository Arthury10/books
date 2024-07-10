import { createPool, Pool } from "mysql2/promise";

class Database {
  private pool: Pool;

  constructor() {
    this.pool = createPool({
      host: "192.168.8.177",
      user: "root",
      password: "admin",
      database: "library_system",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    console.log("Conexão com o banco de dados estabelecida.");
  }

  public async query(sql: string, values?: any[]): Promise<any> {
    const [rows, fields] = await this.pool.execute(sql, values);
    return rows;
  }

  public async close(): Promise<void> {
    await this.pool.end();
  }
}

export default Database;
