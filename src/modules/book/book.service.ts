import Repository from "src/repository";
import Book from "./model/book.model";
import { v4 as uuidv4 } from "uuid";
import { FilterType, CreateBookType, UpdateBookType } from "./types";

class BookService {
  constructor(
    private readonly repository: Repository<Book> = new Repository<Book>(
      "books"
    )
  ) {}

  createBook(data: CreateBookType): Book {
    const newBook = new Book({
      ...data,
      id: uuidv4(),
      created_at: new Date(),
      updated_at: new Date(),
    });

    const createdBook = this.repository.createData(newBook);

    return createdBook;
  }

  findAllBooks(filter?: FilterType): Book[] {
    const books = this.repository.findAll();

    if (filter) {
      return books.filter(filter).map((book) => new Book(book));
    }

    return books.map((book) => new Book(book));
  }

  findBookById(id: string): Book | null {
    const result = this.repository.findById(id);
    if (!result) {
      console.error(`Livro com ID ${id} não encontrado`);
      return null;
    }

    const book = new Book(result);
    return book;
  }

  updateBook({ id, update }: UpdateBookType): Book | null {
    const book = this.findBookById(id);
    if (!book) {
      return null;
    }

    const validateValues = Object.entries(update).filter(Boolean);

    const updatedBook = new Book({
      ...book,
      ...validateValues,
      updated_at: new Date(),
    });

    const result = this.repository.updateData(id, updatedBook);

    return result;
  }

  deleteBook(id: string): Book | null {
    const book = this.findBookById(id);
    if (!book) {
      return null;
    }

    this.repository.deleteData(id);
    return book;
  }
}

export default BookService;
