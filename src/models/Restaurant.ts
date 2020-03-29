import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

// https://stackoverflow.com/questions/29299477/how-to-create-and-use-enum-in-mongoose
const RestaurantSchema = new Schema(
  {
    restaurantName: { type: String, required: true },     // possibly duplicates yelp name
    yelpBusinessDetails: { type: Schema.Types.Mixed },    // Details associated with this restaurant

    tags: [{ type: String }],
    
    reviews: [{
      userName: { type: String, required: true },
      date: { type: Date, default: Date.now, required: true },
      comments: { type: String, required: true },
      rating: { type: Number, required: true },
      wouldReturn: { type: Boolean },
    }],
  },
  { minimize: false },
);

export default mongoose.model('Restaurant', RestaurantSchema);
