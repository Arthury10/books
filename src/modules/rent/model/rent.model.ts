class Rent {
  constructor(
    public readonly id: number,
    public readonly user_id: number,
    public readonly book_id: number,
    public readonly devolution_date: Date,
    public readonly created_at: Date,
    public readonly updated_at: Date
  ) {}
}

export default Rent;
