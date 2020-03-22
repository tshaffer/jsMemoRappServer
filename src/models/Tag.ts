import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TagSchema = new Schema(
  {
    type: { type: String, required: true },             // type is 'Restaurant Type' or 'Food Item', etc.
    value: { type: String, required: true },            // value is 'Italian' or 'Pizza', etc,
  },
);

export default mongoose.model('User', TagSchema);
