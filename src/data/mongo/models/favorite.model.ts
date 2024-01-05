import { Schema, model } from 'mongoose';

const favoriteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'User id is required'] },
  property: {
    type: Schema.Types.ObjectId,
    ref: 'Property',
    required: [true, 'Property id is required'],
  },
  contacted: { type: Boolean, default: false },
});

favoriteSchema.methods.toJSON = function () {
  const { __v, _id: id, ...favorite } = this.toObject();
  return { id, ...favorite };
};

export const Favorite = model('Favorite', favoriteSchema);
