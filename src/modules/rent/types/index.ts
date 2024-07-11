import Rent from "../model/rent.model";

export type FilterType = (rent: Rent) => boolean;

export interface CreateRentType {
  user_id: string;
  book_id: string;
  devolution_date?: Date;
}

export type UpdateRentType = {
  id: string;
  update: Partial<Rent>;
};

export interface IRent {
  id: string;
  user_id: string;
  book_id: string;
  devolution_date: Date;
  created_at: Date;
  updated_at: Date;
  status?: "active" | "inactive";
}
