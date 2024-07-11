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

class Main {
  private _inputType: InputType = "initial";

  constructor(
    private userService: UserService = new UserService(),
    private bookService: BookService = new BookService(),
    private rentService: RentService = new RentService(),
    private authService: AuthService = new AuthService(new UserService()),

    //UI
    private userUI: UserUI = new UserUI(userService, bookService, rentService),
    private bookUI: BookUI = new BookUI(bookService, userService, rentService),
    private rentUI: RentUI = new RentUI(rentService, bookService, userService)
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
      options.forEach((option) => {
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
        //Authentication
        case "Login":
          this.handleLogin();
          break;
        case "Register":
          this.handleRegister();
          break;
        //BOOKS UI
        case "Listar Livros":
          this.bookUI.list();
          break;
        case "Cadastrar Livro":
          this.bookUI.create();
          break;
        case "Modificar Livro":
          this.bookUI.update();
          break;
        case "Deletar Livro":
          this.bookUI.delete();
          break;
        //RENT UI
        case "Listar Alugueis":
          this.rentUI.list();
          break;
        case "Alugar Livro":
          this.rentUI.create(Me.getInstance().id);
          break;
        case "Devolver Livro":
          this.rentUI.returnBook(Me.getInstance().id);
          break;
        case "Meus Livros":
          this.rentUI.myBooks(Me.getInstance().id);
          break;
        //USERS UI
        case "Listar Usuários":
          this.userUI.list();
          break;
        case "Cadastrar Usuário":
          this.userUI.create();
          break;
        case "Modificar Usuário":
          this.userUI.update();
          break;
        case "Deletar Usuário":
          this.userUI.delete();
          break;
        case "Meu Perfil":
          this.userUI.myProfile(Me.getInstance().id);
          break;
        // Rent UI
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
        "Modificar Livro",
        "Deletar Livro",
        "Listar Usuários",
        "Cadastrar Usuário",
        "Modificar Usuário",
        "Deletar Usuário",
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
    const data = AuthUI.login();

    const me = this.authService.login(data);

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
    Utils.clearConsole();
  }

  private handleRegister() {
    Utils.clearConsole();
    const data = AuthUI.register();
    const user = this.userService.createUser(data);

    if (user) {
      AuthUI.successRegister();
    } else {
      AuthUI.invalidRegister();
    }

    Utils.pauseConsole();
    Utils.clearConsole();
  }
}

new Main();
