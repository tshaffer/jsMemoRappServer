import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TagSchema = new Schema(
  {
    type: String,
  },
);

export default mongoose.model('Tag', TagSchema);
