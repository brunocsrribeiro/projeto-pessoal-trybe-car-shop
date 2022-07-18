import Service from '.';
import { ServiceError } from '../interfaces/errorInterface';
import {
  Motorcycle,
  MotorcycleSchema } from '../interfaces/MotorcycleInterface';
import MotorcycleModel from '../models/motorcycleModel';

export default class MotorcycleService extends Service<Motorcycle> {
  constructor(model = new MotorcycleModel()) {
    super(model);
  }

  public create = async (
    entity: Motorcycle,
  ): Promise<Motorcycle | ServiceError> => {
    const parsed = MotorcycleSchema.safeParse(entity);

    if (!parsed.success) {
      return { error: parsed.error };
    }
    
    return super.create(entity);
  };

  public update = async (
    id: string,
    entity: Motorcycle,
  ): Promise<Motorcycle | ServiceError | null> => {
    const parsed = MotorcycleSchema.safeParse(entity);

    if (!parsed.success) {
      return { error: parsed.error };
    }

    return super.update(id, entity);
  };

  public delete = async (id: string): 
  Promise<Motorcycle | ServiceError | null> => super.delete(id);
}
