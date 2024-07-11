import Book from "src/modules/book/model/book.model";
import Rent from "src/modules/rent/model/rent.model";
import Utils from "src/utils";

class RentUI {
  static rent() {
    console.log("-".repeat(50));
    console.log("Alugar livro");
    console.log(
      "-- Todos os livros tem um prazo de 7 dias apartir da hora do aluguel --"
    );
    console.log("-".repeat(50));

    const id = Number(Utils.getInput("ID do livro"));

    return id;
  }

  static return() {
    console.log("-".repeat(50));
    console.log("Devolver livro");
    console.log("-".repeat(50));

    const id = Number(Utils.getInput("ID do livro"));
    return id;
  }

  static myBooks(rentedBooks: Rent[], book: Book[]) {
    console.log("-".repeat(50));
    console.log("Meus livros");
    console.log("-".repeat(50));

    console.table(this.formatMyBooksView(rentedBooks, book));

    console.log("Gostaria de devolver algum livro?");
    console.log("1 - Sim");
    console.log("2 - Não");

    const input = Number(Utils.getInput("Opção"));

    if (input === 1) {
      const id = Utils.getInput("ID do livro");
      return id;
    }

    return null;
  }

  static success() {
    console.log("-".repeat(50));
    console.log("Operação realizada com sucesso!");
    console.log("-".repeat(50));
  }

  static error() {
    console.log("-".repeat(50));
    console.log("Erro ao realizar operação");
    console.log("-".repeat(50));
  }

  private static formatMyBooksView(rentedBooks: Rent[], books: Book[]) {
    const myBooks = books.map((book) => {
      return {
        name: book.name,
      };
    });

    console.table(myBooks);
  }
}

export default RentUI;
