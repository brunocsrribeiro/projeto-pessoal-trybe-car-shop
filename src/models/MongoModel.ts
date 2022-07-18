import { Document, Model as MongooseModelInterface } from 'mongoose';
import { Model } from '../interfaces/ModelInterface';

export default abstract class MongoModel<T> implements Model<T> {
  constructor(protected model: MongooseModelInterface<T & Document>) {}

  async create(entity: T): Promise<T> {
    return this.model.create({ ...entity });
  }

  async read(): Promise<T[]> { return this.model.find(); }

  async readOne(id: string): Promise<T | null> {
    return this.model.findOne({ _id: id });
  }

  async update(id: string, entity: T): Promise<T | null> {
    return this.model.findOneAndUpdate(
      { _id: id },
      { ...entity },
    );
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findOneAndDelete({ _id: id });
  }
}
