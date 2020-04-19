import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TagSchema = new Schema(
  {
    value: { type: String, required: true },
  },
);

export default mongoose.model('Tag', TagSchema);
