import { Car, CarSchema } from '../interfaces/CarInterface';
import Service from '.';
import CarModel from '../models/carModel';
import { ServiceError } from '../interfaces/errorInterface';

export default class CarService extends Service<Car> {
  constructor(model = new CarModel()) {
    super(model);
  }

  public create = async (entity: Car): Promise<Car | ServiceError> => {
    const parsed = CarSchema.safeParse(entity);

    if (!parsed.success) {
      return { error: parsed.error };
    }
    
    return super.create(entity);
  };

  public update = async (
    id: string,
    entity: Car,
  ): Promise<Car | ServiceError | null> => {
    const parsed = CarSchema.safeParse(entity);

    if (!parsed.success) {
      return { error: parsed.error };
    }

    return super.update(id, entity);
  };

  public delete = async (id: string): 
  Promise<Car | ServiceError | null> => super.delete(id);
}
