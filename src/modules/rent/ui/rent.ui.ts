import Book from "src/modules/book/model/book.model";
import Rent from "src/modules/rent/model/rent.model";
import Utils from "src/utils";
import RentService from "../rent.service";
import BookService from "src/modules/book/book.service";
import UserService from "src/modules/user/user.service";
import { RentStatus } from "../types";

class RentUI {
  constructor(
    private readonly rentService: RentService,
    private readonly bookService: BookService,
    private readonly userService: UserService
  ) {}

  public list(): void {
    const rents = this.rentService.findAllRents();
    const getUserName = (id: string) => {
      const user = this.userService.findUserById(id);
      return user?.name;
    };
    const getBookName = (id: string) => {
      const book = this.bookService.findBookById(id);
      return book?.name;
    };

    Utils.clearConsole();

    Utils.spaceConsole(1, { separator: "-", size: 50 });
    Utils.textConsole("Lista de livros alugados");
    Utils.spaceConsole(1, { separator: "-", size: 50 });

    const optionView = Utils.getNumberInput(
      "Visualizar em (1 - coluna | 2 - linha | 3 - tabela (Resumo))"
    );

    if (optionView === 1) {
      Utils.formatListViewColumn(rents);
    } else if (optionView === 2) {
      Utils.formatListViewRow(rents);
    } else {
      const formatRents = rents.map((rent) => ({
        Usuario: getUserName(rent.user_id),
        Livro: getBookName(rent.book_id),
        Data: rent.created_at,
        "Data Devolução": rent.devolution_date,
        Status: rent.status,
      }));

      Utils.formatListTable(formatRents);
    }

    Utils.pauseConsole();
    Utils.clearConsole();
  }

  public create(userId: string): void {
    const books = this.bookService.findAllBooks();
    Utils.clearConsole();

    Utils.spaceConsole(1, { separator: "-", size: 50 });
    Utils.textConsole("Alugar livro");
    Utils.spaceConsole(1, { separator: "-", size: 50 });
    const formatBooks = books.map((book) => ({
      Titulo: book.name,
      Autor: book.author,
      Ano: book.release_year,
      Paginas: book.pages,
      Estado: book.rented ? "Indisponivel" : "Disponivel",
    }));

    Utils.formatListTable(formatBooks);
    Utils.spaceConsole(1, { separator: "-", size: 50 });

    const bookId = Utils.getNumberInput("Indetificador do livro (Index)");

    const bookRented = books[bookId];

    if (bookRented.rented) {
      Utils.textConsole("Livro indisponivel");
      return;
    }

    const rent = this.rentService.createRent({
      user_id: userId,
      book_id: bookRented.id,
    });

    if (!rent) {
      this.error();
      return;
    }

    this.success();

    Utils.pauseConsole();
    Utils.clearConsole();
  }

  public myBooks(userId: string): void {
    const rents = this.rentService.findAllRents(
      (rent) => rent.user_id === userId
    );

    const books = this.bookService.findAllBooks((book) => {
      return rents.some((rent) => rent.book_id === book.id);
    });

    const formatBooks = books.map((book) => ({
      Titulo: book.name,
      Autor: book.author,
      Ano: book.release_year,
      Paginas: book.pages,
      Estado: book.rented ? "Indisponivel" : "Disponivel",
      "Entrega Data": rents.find((rent) => rent.book_id === book.id)
        ?.devolution_date,
    }));

    Utils.formatListTable(formatBooks);

    Utils.pauseConsole();
    Utils.clearConsole();
  }

  public returnBook(userId: string): void {
    const rents = this.rentService.findAllRents(
      (rent) => rent.user_id === userId
    );

    const books = this.bookService.findAllBooks((book) => {
      return rents.some((rent) => rent.book_id === book.id);
    });

    const formatBooks = books.map((book) => ({
      Titulo: book.name,
      Autor: book.author,
      Ano: book.release_year,
      Paginas: book.pages,
      Estado: book.rented ? "Indisponivel" : "Disponivel",
      "Entrega Data": rents.find((rent) => rent.book_id === book.id)
        ?.devolution_date,
    }));

    Utils.formatListTable(formatBooks);

    const bookId = Utils.getNumberInput("Indetificador do livro (Index)");

    const book = books[bookId];

    if (!book) {
      Utils.textConsole("Livro não encontrado");
      return;
    }

    const rent = rents.find((rent) => rent.book_id === book.id);

    const updatedBook = this.bookService.updateBook({
      id: book.id,
      update: {
        rented: false,
      },
    });

    if (!rent) {
      this.error();
      return;
    }

    const updatedRent = this.rentService.updateRent({
      id: rent.id,
      update: {
        status: RentStatus.RETURNED,
      },
    });

    if (!updatedBook || !updatedRent) {
      this.error();
      return;
    }

    this.success();

    Utils.pauseConsole();
    Utils.clearConsole();
  }

  private success(): void {
    Utils.clearConsole();

    Utils.spaceConsole(1, { separator: "-", size: 50 });
    Utils.textConsole("Operação realizada com sucesso");
    Utils.spaceConsole(1, { separator: "-", size: 50 });
  }

  private error(): void {
    Utils.clearConsole();

    Utils.spaceConsole(1, { separator: "-", size: 50 });
    Utils.textConsole("Erro ao realizar operação");
    Utils.spaceConsole(1, { separator: "-", size: 50 });
  }

  private simpleViewColumnTableRent(rent: Rent[], fields: string[]): void {
    Utils.spaceConsole(1, { separator: "-", size: 50 });
    Utils.textConsole("Lista de livros alugados");
    Utils.spaceConsole(1, { separator: "-", size: 50 });

    Utils.formatListTable(rent, fields);
  }
}

export default RentUI;
