import promptSync from "prompt-sync";
import Utils from "src/utils";
const prompt = promptSync();

class AuthUI {
  public static login(): { email: string; password: string } {
    Utils.clearConsole();

    console.log("-".repeat(50));
    console.log("Login de usuário");
    console.log("-".repeat(50));

    const email = prompt("Digite seu email: ");
    const password = prompt("Digite sua senha: ");

    Utils.clearConsole();
    return { email, password };
  }

  public static register(): {
    name: string;
    email: string;
    password: string;
    role: "user" | "admin";
  } {
    Utils.clearConsole();

    console.log("-".repeat(50));
    console.log("Registro de usuário");
    console.log("-".repeat(50));

    const name = prompt("Digite seu nome: ");
    const email = prompt("Digite seu email: ");
    const role = prompt(
      "Digite seu cargo (user/admin): "
    ).toLocaleLowerCase() as "user" | "admin";
    const password = prompt("Digite sua senha: ");

    Utils.clearConsole();
    return { name, email, password, role };
  }

  public static successLogin(): void {
    console.log("-".repeat(50));
    console.log("Login realizado com sucesso");
    console.log("-".repeat(50));
  }

  public static invalidLogin(): void {
    console.log("-".repeat(50));
    console.error("Usuário ou senha inválidos");
    console.log("-".repeat(50));
  }

  public static successRegister(): void {
    console.log("-".repeat(50));
    console.log("Usuário criado com sucesso");
    console.log("-".repeat(50));
  }

  public static invalidRegister(): void {
    console.log("-".repeat(50));
    console.error("Erro ao criar usuário");
    console.log("-".repeat(50));
  }
}

export default AuthUI;
