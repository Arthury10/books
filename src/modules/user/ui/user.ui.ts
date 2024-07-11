import Utils from "src/utils";
import User from "../model/user.model";
import UserService from "../user.service";
import BookService from "src/modules/book/book.service";
import RentService from "src/modules/rent/rent.service";

class UserUI {
  constructor(
    private readonly userService: UserService,
    private readonly bookService: BookService,
    private readonly rentService: RentService,
  ) {}

   async myProfile(id: string) {
    const user = this.userService.findUserById(id);
    if(!user) {
      Utils.textConsole("Usuário não encontrado");
      return;
    }
    Utils.spaceConsole(1, { separator: "-", size: 50 });
    Utils.textConsole("Detalhes do usuário");
    Utils.spaceConsole(1, { separator: "-", size: 50 });
    const input = Utils.getNumberInput(
      "Visualizar em (1 - coluna | 2 - linha)"
    );

    if (input === 1) {
      Utils.formatListViewColumn([user]);
    } else {
      Utils.formatListViewRow([user]);
    }
    
    Utils.spaceConsole(1, { separator: "-", size: 50 });
    Utils.textConsole("Gostaria de voltar ao menu ou editar seu perfil?");
    Utils.textConsole("1 - Voltar");
    Utils.textConsole("2 - Editar");
    Utils.spaceConsole(1, { separator: "-", size: 50 });

    const option = Utils.getNumberInput("Opção");

    if (option === 2) {
      const name = Utils.getInput("Nome: ");
      const email = Utils.getInput("Email: ");
      const password = Utils.getInput("Senha: ");
      const role = Utils.getInput("Permissão: (user/admin)") as "user" | "admin";

      const updatedUser = this.userService.updateUser({
        id: user.id,
        update: {
          name,
          email,
          password,
          role,
        },
      });

      if (!updatedUser) {
        this.error();
        return;
      }

      this.success();
    }
    
    Utils.pauseConsole();
    Utils.clearConsole();
  }

  public  list(): void {
    const users = this.userService.findAllUsers();

    Utils.clearConsole();

    Utils.spaceConsole(1, { separator: "-", size: 50 });
    Utils.textConsole("Lista de Usuários");
    Utils.spaceConsole(1, { separator: "-", size: 50 });

    const optionView = Utils.getNumberInput(
      "Visualizar em (1 - coluna | 2 - linha | 3 - tabela (Resumo))"
    );

    if (optionView === 1) {
      Utils.formatListViewColumn(users);
    } else if (optionView === 2) {
      Utils.formatListViewRow(users);
    } else {
      const formatUsers = users.map((user) => ({
        Nome: user.name,
        Email: user.email,
        Permissão: user.role,
        "Livros alugados": user.totalBooksRented,
      }));

      Utils.formatListTable(formatUsers);
      Utils.textConsole("Gostaria de ver detalhes de algum usuário? (s/n)");
      Utils.textConsole("1 - Sim");
      Utils.textConsole("2 - Não");

      const viewComplete = Utils.getNumberInput("Opção");

      if (viewComplete === 1) {
        const index = Utils.getNumberInput("Indetificador do usuário (Index)");
        const user = users[index];

        if (!user) {
          Utils.textConsole("Usuário não encontrado");
          return;
        }

        this.myProfile(user.id);
      }
    }

    Utils.pauseConsole();
    Utils.clearConsole();
  }

  public create(): void {
    Utils.clearConsole();

    Utils.spaceConsole(1, { separator: "-", size: 50 });
    Utils.textConsole("Cadastro de usuário");
    Utils.spaceConsole(1, { separator: "-", size: 50 });

    const name = Utils.getInput("Nome: ");
    const email = Utils.getInput("Email: ");
    const password = Utils.getInput("Senha: ");
    const role = Utils.getInput("Permissão: (user/admin) ").toLowerCase() as "user" | "admin";


    const createdUser = this.userService.createUser({
      name,
      email,
      password,
      role,
    });

    if (!createdUser) {
      this.error();
      return;
    }

    this.success();

    Utils.pauseConsole();
    Utils.clearConsole();
  }

  public update(): void {
    const users = this.userService.findAllUsers();
    const fields = ["Nome", "Email", "Permissão", "Livros alugados"];

    this.simpleViewColumnTable(users, fields);

    const index = Utils.getNumberInput("Indetificador do usuário (Index)");

    const user = users[index];

    if (!user) {
      Utils.textConsole("Usuário não encontrado");
      return;
    }

    Utils.clearConsole();

    Utils.spaceConsole(1, { separator: "-", size: 50 });
    Utils.textConsole("Atualização de usuário");
    Utils.spaceConsole(1, { separator: "-", size: 50 });

    const name = Utils.getInput("Nome: ");
    const email = Utils.getInput("Email: ");
    const password = Utils.getInput("Senha: ");
    const role = Utils.getInput("Permissão: (user/admin) ").toLowerCase() as "user" | "admin";

    const updatedUser = this.userService.updateUser({
      id: user.id,
      update: {
        name,
        email,
        password,
        role,
      },
    });

    if (!updatedUser) {
      this.error();
      return;
    }

    this.success();

    Utils.pauseConsole();
    Utils.clearConsole();
  }

  public delete(): void {
    const users = this.userService.findAllUsers();
    const fields = ["Nome", "Email", "Permissão", "Livros alugados"];

    this.simpleViewColumnTable(users, fields);

    const index = Utils.getNumberInput("Indetificador do usuário (Index)");

    const user = users[index];

    if (!user) {
      Utils.textConsole("Usuário não encontrado");
      return;
    }

    const deletedUser = this.userService.deleteUser(user.id);

    if (!deletedUser) {
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

  private simpleViewColumnTable(books: User[], fields: string[]): void {
    Utils.spaceConsole(1, { separator: "-", size: 50 });
    Utils.textConsole("Lista de Usuários");
    Utils.spaceConsole(1, { separator: "-", size: 50 });

    Utils.formatListTable(books, fields);
  }
}

export default UserUI;
