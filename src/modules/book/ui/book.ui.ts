import Book from "src/modules/book/model/book.model";
import Utils from "src/utils";
import { UpdateBookType } from "../types";

class BookUI {
  static list(books: Book[]): void {
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
  }

  static create(): {
    title: string;
    author: string;
    year: number;
    pages: number;
  } {
    Utils.clearConsole();

    Utils.spaceConsole(1, { separator: "-", size: 50 });
    Utils.textConsole("Cadastro de livro");
    Utils.spaceConsole(1, { separator: "-", size: 50 });

    const title = Utils.getInput("Título");
    const author = Utils.getInput("Autor");
    const year = Utils.getNumberInput("Ano de publicação");
    const pages = Utils.getNumberInput("Número de páginas");

    return {
      title,
      author,
      year,
      pages,
    };
  }

  public static update(books: Book[]): UpdateBookType {
    Utils.clearConsole();

    Utils.spaceConsole(1, { separator: "-", size: 50 });
    Utils.textConsole("Atualização de livro");
    Utils.spaceConsole(1, { separator: "-", size: 50 });
    this.list(books);
    Utils.spaceConsole(1, { separator: "-", size: 50 });

    const id = Utils.getNumberInput("Id do livro (Index)");

    const bookToUpdate = books[id];

    const name = Utils.getInput("Título");
    const author = Utils.getInput("Autor");
    const year = Utils.getNumberInput("Ano de publicação");
    const pages = Utils.getNumberInput("Número de páginas");

    return {
      id: bookToUpdate?.id,
      update: {
        name,
        author,
        release_year: year,
        pages,
      },
    };
  }

  public static success(): void {
    Utils.clearConsole();

    Utils.spaceConsole(1, { separator: "-", size: 50 });
    Utils.textConsole("Operação realizada com sucesso");
    Utils.spaceConsole(1, { separator: "-", size: 50 });
  }

  public static error(): void {
    Utils.clearConsole();

    Utils.spaceConsole(1, { separator: "-", size: 50 });
    Utils.textConsole("Erro ao realizar operação");
    Utils.spaceConsole(1, { separator: "-", size: 50 });
  }

  private static show(book: Book): void {
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
}

export default BookUI;
