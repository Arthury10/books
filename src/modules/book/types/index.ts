import Book from "../model/book.model";

export type FilterType = (book: Book) => boolean;

export interface CreateBookType {
  name: string;
  author: string;
  release_year: number;
  pages: number;
  description: string;
}

export type UpdateBookType = {
  id: string;
  update: Partial<Book>;
};

export interface IBook {
  id: string;
  name: string;
  author: string;
  release_year: number;
  pages: number;
  description: string;
  created_at: Date;
  updated_at: Date;
  rented?: boolean;
  rented_at?: Date | null;
  devolution_date?: Date | null;
  totalRents?: number;
}
