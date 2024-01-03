import { Schema, model } from 'mongoose';

const propertySchema = new Schema({
  type: { type: String, required: true, enum: ['rent', 'sale'], default: 'rent' },
  address: { type: String, required: true },
  rent: { type: Number, required: true, default: 0 },
  maintance: { type: Number, required: true, default: 0 },
  price: { type: Number, required: true, default: 0 },
  propertyType: {
    type: String,
    required: true,
    enum: ['flat', 'house', 'apartment'],
    default: 'flat',
  },
  bedRooms: { type: Number, required: true, default: 1 },
  bathRooms: { type: Number, required: true, default: 1 },
  area: { type: Number, required: true, default: 0 },
  petAllowed: { type: Boolean, default: false },
  description: String,
  images: { type: [String], default: [] },
  status: { type: String, required: true, enum: ['active', 'inactive'], default: 'active' },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

propertySchema.methods.toJSON = function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __v, _id: id, ...property } = this.toObject();
  return { id, ...property };
};

export const Property = model('Property', propertySchema);
