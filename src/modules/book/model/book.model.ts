import { IBook } from "../types";

class BookModel implements IBook {
  public readonly id: string;
  public readonly name: string;
  public readonly author: string;
  public readonly release_year: number;
  public readonly pages: number;
  public readonly description: string;
  public readonly created_at: Date;
  public readonly updated_at: Date;
  public readonly rented?: boolean = false;
  public readonly rented_at?: Date | null;
  public readonly devolution_date?: Date | null;
  public readonly totalRents?: number = 0;

  constructor(data: IBook) {
    this.id = data.id;
    this.name = data.name;
    this.author = data.author;
    this.release_year = data.release_year;
    this.pages = data.pages;
    this.description = data.description;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
    this.rented = data.rented;
    this.rented_at = data.rented_at;
    this.devolution_date = data.devolution_date;
    this.totalRents = data.totalRents;
  }
}

export default BookModel;
