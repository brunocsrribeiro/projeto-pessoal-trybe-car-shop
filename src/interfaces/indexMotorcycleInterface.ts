import { Document } from 'mongoose';
import { Motorcycle } from './MotorcycleInterface';

export default interface MotorcycleDocument extends Motorcycle, Document {}
