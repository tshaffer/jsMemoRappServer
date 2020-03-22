import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

// https://stackoverflow.com/questions/29299477/how-to-create-and-use-enum-in-mongoose
const RestaurantSchema = new Schema(
  {
    restaurantName: { type: String, required: true },     // possibly duplicates yelp name
    yelpBusinessDetails: { type: Schema.Types.Mixed },    // Details associated with this restaurant

    tags: [{ type: String }],

    userReviews: [{
      userName: { type: String, required: true },
      wouldReturn: { type: Boolean },
      userTags: [{ type: String }],
      userVisitReviews: [{
        date: { type: Date, default: Date.now, required: true },
        comments: { type: String, required: true },
        rating: { type: Number },
      }],
      // overallReview - calculated as average of individual reviews during query
    }],
  },
);

export default mongoose.model('Restaurant', RestaurantSchema);
