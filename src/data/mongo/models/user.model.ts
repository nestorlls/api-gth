import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: [String], required: true, enum: ['homeseeker', 'landlord'], default: 'homeseeker' },
  avatar: { type: String, default: null },
});

userSchema.methods.toJSON = function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __v, password, _id: id, ...userObject } = this.toObject();
  return { id, ...userObject };
};

export const User = model('User', userSchema);
