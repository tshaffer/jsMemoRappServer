import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

// https://stackoverflow.com/questions/29299477/how-to-create-and-use-enum-in-mongoose
const RestaurantSchema = new Schema(
  {
    restaurantName: { type: String, required: true },     // possibly duplicates yelp name
    yelpBusinessDetails: { type: Schema.Types.Mixed },    // Details associated with this restaurant

    tags: [{ type: String }],

    // reviewsByUser: {
    //   type: Map,
    //   of: Schema.Types.Mixed,
    // },
    reviewsByUser: { type: Schema.Types.Mixed },
      // type: Map,
      // of: [{
      //   userName: { type: String, required: true },
      //   wouldReturn: { type: Boolean },
      //   userTags: [{ type: String }],
      //   visitReviews: [{
      //     date: { type: Date, default: Date.now, required: true },
      //     comments: { type: String },
      //     rating: { type: Number },
      //   }],
      // }],
    // },
    // usersReviews: [{
    //   userName: { type: String, required: true },
    //   wouldReturn: { type: Boolean },
    //   userTags: [{ type: String }],
    //   visitReviews: [{
    //     date: { type: Date, default: Date.now, required: true },
    //     comments: { type: String },
    //     rating: { type: Number },
    //   }],
    //   // overallReview - calculated as average of individual reviews during query
    // }],
  },
);

export default mongoose.model('Restaurant', RestaurantSchema);
