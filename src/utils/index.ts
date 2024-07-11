import promptSync from "prompt-sync";
const prompt = promptSync();

class Utils {
  static clearConsole() {
    console.clear();
  }

  static pauseConsole() {
    console.log("Pressione qualquer tecla para continuar...");
    prompt("");
  }

  static textConsole(text: string) {
    console.log(text);
  }

  static spaceConsole(
    spaces: number = 1,
    config?: {
      separator: string;
      size?: number;
    }
  ) {
    for (let i = 0; i < spaces; i++) {
      console.log(config?.separator?.repeat(config?.size ?? 1) ?? "");
    }
  }

  static getInput(label: string): string {
    return prompt(`${label}: `);
  }

  static getNumberInput(label: string): number {
    return Number(prompt(`${label}: `));
  }

  static getBooleanInput(label: string): boolean {
    return prompt(`${label} (s/n): `).toLowerCase() === "s";
  }

  static formatDate(date: Date): string {
    const dateObj = new Date(date);
    return dateObj.toLocaleString("pt-BR", {
      timeZone: "UTC",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  static formatListViewColumn(list: { [key: string]: any }[]) {
    list.forEach((user, index) => {
      if (index === 0) {
        this.spaceConsole(1, { separator: "-", size: 50 });
      }
      Object.entries(user).forEach(([key, value]) => {
        if (key === "password") {
          return;
        }
        if (
          key.toLowerCase().includes("date") ||
          key.toLowerCase().includes("at")
        ) {
          value = this.formatDate(value);
        }
        this.textConsole(`${Utils.Capitalize(key)}: ${value}`);
      });
      this.spaceConsole(1, { separator: "-", size: 50 });
    });
    this.spaceConsole();
  }

  static formatListViewRow(list: { [key: string]: any }[]) {
    list.forEach((user, index) => {
      let row = "";
      if (index !== 0) {
        this.spaceConsole(1, { separator: "-", size: 50 });
      }
      Object.entries(user).forEach(([key, value], index) => {
        if (key === "password") {
          return;
        }
        if (
          key.toLowerCase().includes("date") ||
          key.toLowerCase().includes("at")
        ) {
          value = this.formatDate(value);
        }
        if (index === user.length - 1) {
          row += `${this.Capitalize(key)}: ${value}`;
        } else {
          row += `${this.Capitalize(key)}: ${value} | `;
        }
      });
      this.textConsole(row);
      this.spaceConsole(1, { separator: "-", size: 50 });
    });
    this.spaceConsole();
  }

  static formatListTable(list: { [key: string]: any }[], fields?: string[]) {
    const format = list.map((item) => {
      const obj: { [key: string]: any } = {};
      Object.entries(item).forEach(([key, value]) => {
        if (
          key.toLowerCase().includes("date") ||
          key.toLowerCase().includes("at")
        ) {
          value = this.formatDate(value);
        }
        obj[this.Capitalize(key)] = value;
      });
      return obj;
    });

    if (fields) {
      const newFields = Object?.keys(format[0])?.filter((key) =>
        fields?.includes(key.toLowerCase())
      );
      fields = newFields;
    }

    console.table(format, fields);
    this.spaceConsole();
  }

  static Capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  static validateEmptyFields(fields: { [key: string]: any }): {
    [key: string]: any;
  } {
    let newFields = { ...fields };
    Object.entries(fields).forEach(([key, value]) => {
      if (
        (typeof value !== "boolean" && !value) ||
        value === "" ||
        value === 0
      ) {
        delete newFields[key as keyof typeof fields];
      }
    });

    return newFields;
  }
}

export default Utils;
