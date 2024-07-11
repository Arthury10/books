import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

class Repository<T extends { id: string }> {
  private dbPath: string;

  constructor(db: "users" | "books" | "rents") {
    const filePath = join(__dirname, "../../db/", `${db}.json`);
    this.dbPath = filePath;
  }

  public findAll(): T[] {
    const getFile = readFileSync(this.dbPath, { encoding: "utf-8" });

    const transformToObject: T[] = JSON.parse(getFile);

    return transformToObject;
  }

  public createData(data: T): T {
    const getData = this.findAll();

    const newFile = [...getData, data];

    writeFileSync(this.dbPath, JSON.stringify(newFile));

    return data;
  }

  public updateData(id: string, data: T): T {
    const getData = this.findAll().filter((item) => item.id !== id);
    const newFile = [...getData, data];
    writeFileSync(this.dbPath, JSON.stringify(newFile));
    return data;
  }

  public findById(id: string): T | null {
    const getData = this.findAll().find((item) => item.id === id);
    return getData ?? null;
  }

  public deleteData(id: string): void {
    const getData = this.findAll().filter((item) => item.id !== id);
    writeFileSync(this.dbPath, JSON.stringify(getData));
  }
}

export default Repository;
