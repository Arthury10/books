import User from "src/modules/user/model/user.model";

class Me {
  private static instance: Me | null = null;

  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly role: "admin" | "user" = "user"
  ) {}

  public static getInstance(): Me {
    if (!Me.instance) {
      throw new Error("Usuário não autenticado");
    }
    return Me.instance;
  }

  public static setInstance(user: User): void {
    Me.instance = new Me(user.id, user.name, user.email, user.role);
  }

  public static clearInstance(): void {
    Me.instance = null;
  }
}

export default Me;
