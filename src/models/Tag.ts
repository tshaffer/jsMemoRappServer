import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TagSchema = new Schema(
  {
    value: { type: String, required: true },            // anything
  },
);

export default mongoose.model('Tag', TagSchema);
