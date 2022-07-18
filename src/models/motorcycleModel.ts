import mongoose from 'mongoose';
import MongoModel from './MongoModel';
import SchemaMotorcycle from '../schemas/motorcycle';
import { Motorcycle } from '../interfaces/MotorcycleInterface';

export default class MotorcycleModel extends MongoModel<Motorcycle> {
  constructor(model = mongoose.model('Motorcycle', SchemaMotorcycle)) {
    super(model);
  }
}
