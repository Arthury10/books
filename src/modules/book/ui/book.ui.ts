import Book from "src/modules/book/model/book.model";
import Utils from "src/utils";
import BookService from "../book.service";
import UserService from "src/modules/user/user.service";
import RentService from "src/modules/rent/rent.service";

class BookUI {
  constructor(
    private readonly bookService: BookService,
    private readonly userService: UserService,
    private readonly rentService: RentService,
  ) {}

   public list(): void {
    const books = this.bookService.findAllBooks();

    Utils.clearConsole();

    Utils.spaceConsole(1, { separator: "-", size: 50 });
    Utils.textConsole("Lista de livros");
    Utils.spaceConsole(1, { separator: "-", size: 50 });

    const optionView = Utils.getNumberInput(
      "Visualizar em (1 - coluna | 2 - linha | 3 - tabela (Resumo))"
    );

    if (optionView === 1) {
      Utils.formatListViewColumn(books);
    } else if (optionView === 2) {
      Utils.formatListViewRow(books);
    } else {
      const formatBooks = books.map((book) => ({
        Titulo: book.name,
        Autor: book.author,
        Ano: book.release_year,
        Paginas: book.pages,
        Estado: book.rented ? "Indisponivel" : "Disponivel",
      }));

      Utils.formatListTable(formatBooks);
      Utils.textConsole("Gostaria de ver detalhes de algum livro? (s/n)");
      Utils.textConsole("1 - Sim");
      Utils.textConsole("2 - Não");

      const viewComplete = Utils.getNumberInput("Opção");

      if (viewComplete === 1) {
        const index = Utils.getNumberInput("Indetificador do livro (Index)");
        const book = books[index];

        if (!book) {
          Utils.textConsole("Livro não encontrado");
          return;
        }

        this.show(book);
      }
    }

    Utils.pauseConsole();
    Utils.clearConsole();
  }

   public create(): void {
    Utils.clearConsole();

    Utils.spaceConsole(1, { separator: "-", size: 50 });
    Utils.textConsole("Cadastro de livro");
    Utils.spaceConsole(1, { separator: "-", size: 50 });

    const name = Utils.getInput("Título");
    const description = Utils.getInput("Descrição");
    const author = Utils.getInput("Autor");
    const release_year = Utils.getNumberInput("Ano de publicação");
    const pages = Utils.getNumberInput("Número de páginas");


    const newBook = this.bookService.createBook({
      name,
      description,
      author,
      release_year,
      pages,
    });

    if (newBook) {
      this.success();
    } else {
      this.error();
    }

    Utils.pauseConsole();
    Utils.clearConsole();
  }

  public update(): void {
    const books = this.bookService.findAllBooks();
    Utils.clearConsole();

    Utils.spaceConsole(1, { separator: "-", size: 50 });
    Utils.textConsole("Atualização de livro");
    Utils.spaceConsole(1, { separator: "-", size: 50 });
    this.simpleViewColumnTable(books, ["name", "author", "release_year"]);
    Utils.spaceConsole(1, { separator: "-", size: 50 });

    const id = Utils.getNumberInput("Indetificador do livro (Index)");

    const bookToUpdate = books[id];

    const name = Utils.getInput("Título");
    const author = Utils.getInput("Autor");
    const year = Utils.getNumberInput("Ano de publicação");
    const pages = Utils.getNumberInput("Número de páginas");

    const updatedBook = this.bookService.updateBook({
      id: bookToUpdate?.id,
      update: {
        name,
        author,
        release_year: year,
        pages,
      },
    });
    
    
    if (updatedBook) {
      Utils.formatListViewColumn([updatedBook])
      this.success();
    } else {
      this.error();
    }
    Utils.pauseConsole();
    Utils.clearConsole();
  }

  public delete(): void {
    const books = this.bookService.findAllBooks();
    Utils.clearConsole();

    Utils.spaceConsole(1, { separator: "-", size: 50 });
    Utils.textConsole("Exclusão de livro");
    Utils.spaceConsole(1, { separator: "-", size: 50 });
    this.simpleViewColumnTable(books, ["name", "author", "release_year"]);
    Utils.spaceConsole(1, { separator: "-", size: 50 });

    const id = Utils.getNumberInput("Indetificador do livro (Index)");

    const bookToDelete = books[id];

    const deletedBook = this.bookService.deleteBook(bookToDelete?.id);

    if (deletedBook) {
      Utils.formatListViewColumn([deletedBook]);
      this.success();
    } else {
      this.error();
    }

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

  private show(book: Book): void {
    Utils.clearConsole();

    Utils.spaceConsole(1, { separator: "-", size: 50 });
    Utils.textConsole("Detalhes do livro");
    Utils.spaceConsole(1, { separator: "-", size: 50 });
    const fieldsAllow = Object.keys(book).filter(
      (key) => key !== "id" && !key.includes("_at")
    );
    Utils.formatListTable([book], fieldsAllow);
    Utils.spaceConsole(1, { separator: "-", size: 50 });
  }

  private simpleViewColumnTable(books: Book[], fields: string[]): void {
    Utils.spaceConsole(1, { separator: "-", size: 50 });
    Utils.textConsole("Lista de livros");
    Utils.spaceConsole(1, { separator: "-", size: 50 });

    Utils.formatListTable(books, fields);
  }
}

export default BookUI;
