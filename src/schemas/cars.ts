import { Schema } from 'mongoose';
import CarDocument from '../interfaces/indexCarInterface';

const SchemaCar = new Schema<CarDocument>({
  model: { type: String, required: true },
  year: { type: Number, required: true },
  color: { type: String, required: true },
  status: { type: Boolean },
  buyValue: { type: Number, required: true },
  doorsQty: { type: Number, required: true },
  seatsQty: { type: Number, required: true },
}, { versionKey: false });

export default SchemaCar;
