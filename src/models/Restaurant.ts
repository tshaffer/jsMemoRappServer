import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

// https://stackoverflow.com/questions/29299477/how-to-create-and-use-enum-in-mongoose
const RestaurantSchema = new Schema(
  {
    restaurantName: { type: String, required: true },     // possibly duplicates yelp name
    yelpBusinessDetails: { type: Schema.Types.Mixed },    // Details associated with this restaurant

    tags: [{ type: String }],
    
    // export interface ReviewsByUsersMap {
    //   [userName: string]: UserReviewsEntity;
    // }
    // export interface UserReviewsEntity {
    //   userName: string;
    //   wouldReturn: boolean;
    //   userTags: string[];
    //   visitReviews: VisitReviewEntity[];
    // }
    reviewsByUser: { type: Schema.Types.Mixed },
  },
  { minimize: false },
);

export default mongoose.model('Restaurant', RestaurantSchema);
