import promptSync from "prompt-sync";
import AuthUI from "./modules/auth/ui/auth.ui";
import BookUI from "./modules/book/ui/book.ui";
import RentUI from "./modules/rent/ui/rent.ui";
import Me from "./modules/auth/model/me.model";
import AuthService from "./modules/auth/auth.service";
import BookService from "./modules/book/book.service";
import RentService from "./modules/rent/rent.service";
import UserService from "./modules/user/user.service";
import Utils from "./utils";
import UserUI from "./modules/user/ui/user.ui";

type InputType = "initial" | "menuClient" | "menuAdmin";

const prompt = promptSync();

class Main {
  private _inputType: InputType = "initial";

  constructor(
    private userService: UserService = new UserService(),
    private bookService: BookService = new BookService(),
    private rentService: RentService = new RentService(),
    private authService: AuthService = new AuthService(new UserService())
  ) {
    this.init();
  }

  async init() {
    Utils.clearConsole();
    this.lifeCycle();
  }

  private lifeCycle() {
    while (true) {
      Utils.spaceConsole(2);
      Utils.textConsole("---- Sistema de Biblioteca ----");
      Utils.spaceConsole(2);
      Utils.textConsole("Selecione uma opção:");
      Utils.spaceConsole();
      Utils.textConsole("0 - Fechar Sistema");
      if (this._inputType !== "initial") {
        Utils.textConsole("1 - Voltar");
      }

      const options = this.Inputs(this._inputType);

      Utils.spaceConsole(1, { separator: "-", size: 50 });
      options.forEach((option, index) => {
        Utils.textConsole(`${option.id} - ${option.name}`);
      });
      Utils.spaceConsole(1, { separator: "-", size: 50 });

      const input = Utils.getNumberInput("Opção desejada: ");

      if (input === 0) {
        break;
      }
      if (input === 1) {
        this._inputType = "initial";
      }

      const optionName = options.find((option) => option.id === input)?.name;

      switch (optionName) {
        case "Login":
          this.handleLogin();
          break;
        case "Register":
          this.handleRegister();
          break;
        case "Listar Livros":
          this.handleListBooks();
          break;
        case "Alugar Livro":
          this.handleRentBook();
          break;
        case "Devolver Livro":
          this.handleReturnBook();
          break;
        case "Meus Livros":
          this.handleMyBooks();
          break;
        case "Listar Usuários":
          this.handleListUsers();
          break;
        case "Meu Perfil":
          this.handleMyProfile();
          break;
        case "Sair":
          this.logout();
          break;
        default:
          console.log("Opção inválida");
          break;
      }
    }
  }

  private Inputs(type: InputType) {
    const options = {
      initial: this.Options("initial"),
      menuClient: this.Options("menuClient"),
      menuAdmin: this.Options("menuAdmin"),
    };

    return options[type];
  }

  private Options(type: InputType) {
    const options = {
      initial: ["Login", "Register"],
      menuClient: [
        "Listar Livros",
        "Alugar Livro",
        "Devolver Livro",
        "Meus Livros",
        "Meu Perfil",
        "Sair",
      ],
      menuAdmin: [
        "Listar Livros",
        "Cadastrar Livro",
        "Listar Usuários",
        "Cadastrar Usuário",
        "Listar Alugueis",
        "Meu Perfil",
        "Sair",
      ],
    };

    return options[type]?.map((option, index) => {
      return {
        id: index + 2,
        name: option,
      };
    });
  }

  private handleLogin() {
    // const data = AuthUI.login();
    const TEMPUSER = {
      email: "arthurropke@hotmail.com",
      password: "123456",
    };
    const TEMPADMIN = {
      email: "joao@teste.com",
      password: "123",
    };
    const me = this.authService.login(TEMPADMIN);

    Utils.clearConsole();

    if (me) {
      AuthUI.successLogin();
      this._inputType = me.role === "admin" ? "menuAdmin" : "menuClient";
    } else {
      AuthUI.invalidLogin();
    }
    Utils.pauseConsole();
  }

  private logout() {
    this._inputType = "initial";
    this.authService.logout();
  }

  private handleRegister() {
    const data = AuthUI.register();
    const user = this.userService.createUser(data);

    if (user) {
      AuthUI.successRegister();
    } else {
      AuthUI.invalidRegister();
    }

    Utils.pauseConsole();
  }

  private handleListBooks() {
    const books = this.bookService.findAllBooks();
    BookUI.list(books);
    Utils.pauseConsole();
  }

  private handleRentBook() {
    const books = this.bookService.findAllBooks();
    BookUI.list(books);
    const id = RentUI.rent();

    const bookRent = books[id];

    const rent = this.rentService.createRent({
      book_id: bookRent.id,
      user_id: Me.getInstance().id,
    });

    this.bookService.updateBook({
      id: bookRent.id,
      update: {
        rented: true,
        release_year: bookRent.release_year,
        totalRents: (bookRent?.totalRents ?? 0) + 1,
      },
    });

    if (rent) {
      RentUI.success();
    } else {
      RentUI.error();
    }

    Utils.pauseConsole();
  }

  private handleReturnBook() {
    // Implementar lógica para devolver livro
  }

  private handleMyBooks() {
    const rentedBooks = this.rentService.findAllRents(
      (rent) => rent.user_id === Me.getInstance().id
    );

    const books = this.bookService.findAllBooks((book) => {
      return rentedBooks.some((rent) => rent.book_id === book.id);
    });

    RentUI.myBooks(rentedBooks, books);
    Utils.pauseConsole();
  }

  private handleMyProfile() {
    Utils.clearConsole();
    const user = this.userService.findUserById(Me.getInstance().id);
    if (user) {
      UserUI.showUser(user);
    }
    Utils.pauseConsole();
  }

  private handleListUsers() {
    const users = this.userService.findAllUsers();
    UserUI.showUsers(users);
    Utils.pauseConsole();
  }
}

new Main();
