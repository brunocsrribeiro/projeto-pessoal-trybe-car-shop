import mongoose from 'mongoose';
import SchemaCar from '../schemas/cars';
import MongoModel from './MongoModel';
import { Car } from '../interfaces/CarInterface';

export default class CarModel extends MongoModel<Car> {
  constructor(model = mongoose.model('Car', SchemaCar)) {
    super(model);
  }
}
