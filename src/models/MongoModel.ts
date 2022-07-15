import { Document, Model as MongooseModelInterface } from 'mongoose';
import { Model } from '../interfaces/ModelInterface';

export default abstract class MongoModel<T> implements Model<T> {
  constructor(protected model: MongooseModelInterface<T & Document>) {}

  async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  async read(): Promise<T[]> { return this.model.find(); }

  async readOne(id: string): Promise<T | null> {
    return this.model.findOne({ _id: id });
  }

  async update(id: string, obj: T): Promise<T | null> {
    return this.model.findOneAndUpdate(
      { _id: id },
      { ...obj },
    );
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findOneAndDelete({ _id: id });
  }
}
