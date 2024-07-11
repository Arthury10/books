import Utils from "src/utils";
import User from "../model/user.model";

class UserUI {
  static async showUser(user: User) {
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
  }

  static async showUsers(users: User[]) {
    Utils.spaceConsole(1, { separator: "-", size: 50 });
    Utils.textConsole("Detalhes dos usuários");
    Utils.spaceConsole(1, { separator: "-", size: 50 });

    const input = Utils.getNumberInput(
      "Visualizar em (1 - coluna | 2 - linha)"
    );

    if (input === 1) {
      Utils.formatListViewColumn(users);
    } else {
      Utils.formatListViewRow(users);
    }
  }
}

export default UserUI;
