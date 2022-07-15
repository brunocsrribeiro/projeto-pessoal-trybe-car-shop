import { Schema } from 'mongoose';
import MotorcycleDocument from '../interfaces/indexMotorcycleInterface';

const SchemaMotorcycle = new Schema<MotorcycleDocument>({
  model: { type: String, required: true },
  year: { type: Number, required: true },
  color: { type: String, required: true },
  status: { type: Boolean },
  buyValue: { type: Number, required: true },
  category: { type: String, required: true },
  engineCapacity: { type: Number, required: true },
}, { versionKey: false });

export default SchemaMotorcycle;
