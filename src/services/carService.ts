import { Car, CarSchema } from '../interfaces/CarInterface';
import Service from '.';
import CarModel from '../models/carModel';
import { ServiceError } from '../interfaces/errorInterface';

export default class CarService extends Service<Car> {
  constructor(model = new CarModel()) {
    super(model);
  }

  public create = async (obj: Car): Promise<Car | ServiceError> => {
    const parsed = CarSchema.safeParse(obj);

    if (!parsed.success) {
      return { error: parsed.error };
    }
    
    return this.model.create(obj);
  };
}
