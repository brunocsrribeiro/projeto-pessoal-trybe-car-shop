import { ServiceError } from '../interfaces/errorInterface';
import { Model } from '../interfaces/ModelInterface';

export default abstract class Service<T> {
  constructor(public model: Model<T>) { }

  public async create(entity: T): Promise<T | ServiceError> {
    return this.model.create(entity);
  }

  public async read(): Promise<T[] | ServiceError> {
    return this.model.read();
  }

  public async readOne(id: string): Promise<T | null | ServiceError> {
    return this.model.readOne(id);
  }

  public async update(id: string, entity: T): Promise<T | null | ServiceError> {
    return this.model.update(id, entity);
  }

  public async delete(id: string): Promise<T | null | ServiceError> {
    return this.model.delete(id);
  }
}
