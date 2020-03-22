import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    userName: { type: String, required: true, unique: true },     // friendly name - must be unique within the database
    password: { type: String, required: true },                   // not in use initially
    email: { type: String, required: true },                      // for future use
    userTags: [{ type: String }],                                 // tags created by this user

    // ADD: list of users that should have read access for ALL reviews
    // ADD: list of users that this user has read access to
  },
);

export default mongoose.model('User', UserSchema);
