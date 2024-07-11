import { IRent, RentStatus } from "../types";

class Rent implements IRent {
  public readonly id: string;
  public readonly user_id: string;
  public readonly book_id: string;
  public readonly devolution_date: Date;
  public readonly created_at: Date;
  public readonly updated_at: Date;
  public readonly status?: RentStatus;

  constructor(data: IRent) {
    this.id = data.id;
    this.user_id = data.user_id;
    this.book_id = data.book_id;
    this.devolution_date = data.devolution_date;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
    this.status = data.status ?? RentStatus.RENTED;
  }
}

export default Rent;
