import { Document } from 'mongoose';
import { Car } from './CarInterface';

export default interface CarDocument extends Car, Document {}
