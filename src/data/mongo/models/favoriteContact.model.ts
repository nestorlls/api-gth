import { Schema, model } from 'mongoose';

const favoriteAndContactedSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'User id is required'] },
  property: {
    type: Schema.Types.ObjectId,
    ref: 'Property',
    required: [true, 'Property id is required'],
  },
  favorite: { type: Boolean, default: false },
  contacted: { type: Boolean, default: false },
});

favoriteAndContactedSchema.methods.toJSON = function () {
  const { __v, _id: id, ...favorite } = this.toObject();
  return { id, ...favorite };
};

export const FavoriteAndContacted = model('FavoriteAndContacted', favoriteAndContactedSchema);
