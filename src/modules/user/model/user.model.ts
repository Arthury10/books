class User {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: "admin" | "user",
    public readonly created_at: Date,
    public readonly updated_at: Date
  ) {}
}

export default User;
