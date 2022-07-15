import mongoose from 'mongoose';
import MongoModel from './MongoModel';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import SchemaMotorcycle from '../schemas/motorcycle';

export default class MotorcycleModel extends MongoModel<Motorcycle> {
  constructor(model = mongoose.model('Motorcycle', SchemaMotorcycle)) {
    super(model);
  }
}
