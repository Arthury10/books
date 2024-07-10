class Book {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly author: string,
    public readonly release_year: number,
    public readonly pages: number,
    public readonly description: string,
    public readonly created_at: Date,
    public readonly updated_at: Date
  ) {}
}

export default Book;
