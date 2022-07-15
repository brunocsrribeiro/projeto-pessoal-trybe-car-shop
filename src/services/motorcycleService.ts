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
    obj: Motorcycle,
  ): Promise<Motorcycle | ServiceError> => {
    const parsed = MotorcycleSchema.safeParse(obj);

    if (!parsed.success) {
      return { error: parsed.error };
    }
    
    return this.model.create(obj);
  };

  public update = async (
    id: string,
    obj: Motorcycle,
  ): Promise<Motorcycle | ServiceError | null> => {
    const parsed = MotorcycleSchema.safeParse(obj);

    if (!parsed.success) {
      return { error: parsed.error };
    }

    return this.model.update(id, obj);
  };

  public delete = async (
    id: string,
  ): Promise<Motorcycle | ServiceError | null> => {
    const Deleted = await this.model.delete(id);
    return Deleted;
  };
}
