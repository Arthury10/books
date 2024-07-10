import Database from "./db";
import UserService from "./modules/user/user.service";
import promptSync from "prompt-sync";

const prompt = promptSync();

class Main {
  constructor() {
    const db = new Database();
  }

  async init() {
    this.Options("initial");
  }

  private async Inputs(type: "initial" | "menuClient" | "menuAdmin") {
    const options = {
      initial: this.Options("initial"),
      menuClient: this.Options("menuClient"),
      menuAdmin: this.Options("menuAdmin"),
    };
    options[type];

    const input = Number(prompt("Digite a opção desejada: "));

    switch (type) {
      case "initial":
        switch (input) {
          case 1:
            console.log("Login");
            break;
          case 2:
            console.log("Register");
            break;
          default:
            console.log("Opção inválida.");
            break;
        }
        break;
      case "menuClient":
        switch (input) {
          case 1:
            console.log("Menu Client");
            break;
          default:
            console.log("Opção inválida.");
            break;
        }
        break;
      case "menuAdmin":
        switch (input) {
          case 1:
            console.log("Menu Admin");
            break;
          default:
            console.log("Opção inválida.");
            break;
        }
        break;
    }
  }

  private Options(type: "initial" | "menuClient" | "menuAdmin") {
    const options = {
      initial: ["Login", "Register"],
      menuClient: ["Menu Client"],
      menuAdmin: ["Menu Admin"],
    };

    console.log("-".repeat(50));
    options[type].forEach((option, index) => {
      console.log(`${index + 1} - ${option}`);
    });
    console.log("-".repeat(50));
  }
}

new Main();
