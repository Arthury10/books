import Repository from "src/repository";
import Rent from "./model/rent.model";
import { v4 as uuidv4 } from "uuid";
import { FilterType, CreateRentType, UpdateRentType } from "./types";
import Utils from "src/utils";

class RentService {
  constructor(
    private readonly repository: Repository<Rent> = new Repository<Rent>(
      "rents"
    )
  ) {}

  createRent(data: CreateRentType): Rent {
    const weekTime = 7 * 24 * 60 * 60 * 1000;

    const newRent = new Rent({
      ...data,
      devolution_date: new Date(new Date().getTime() + weekTime),
      id: uuidv4(),
      created_at: new Date(),
      updated_at: new Date(),
    });

    const createdRent = this.repository.createData(newRent);

    return createdRent;
  }

  findAllRents(filter?: FilterType): Rent[] {
    const Rents = this.repository.findAll();

    if (filter) {
      return Rents.filter(filter).map((rent) => new Rent(rent));
    }

    return Rents.map((rent) => new Rent(rent));
  }

  findRentById(id: string): Rent | null {
    const result = this.repository.findById(id);
    if (!result) {
      console.error(`Usuário com ID ${id} não encontrado`);
      return null;
    }

    const rent = new Rent(result);
    return rent;
  }

  updateRent({ id, update }: UpdateRentType): Rent | null {
    const rent = this.findRentById(id);
    if (!rent) {
      return null;
    }

    const validateFields = Utils.validateEmptyFields(update);

    const updatedRent = new Rent({
      ...rent,
      ...validateFields,
      updated_at: new Date(),
    });

    const result = this.repository.updateData(id, updatedRent);

    return result;
  }

  deleteRent(id: string): Rent | null {
    const Rent = this.findRentById(id);
    if (!Rent) {
      return null;
    }

    this.repository.deleteData(id);
    return Rent;
  }
}

export default RentService;
