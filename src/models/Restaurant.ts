import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

// https://stackoverflow.com/questions/29299477/how-to-create-and-use-enum-in-mongoose
const RestaurantSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },   // use yelpId as unique id
    name: { type: String, required: true },               // possibly duplicates yelp name
    yelpBusinessDetails: { type: Schema.Types.Mixed },    // Details associated with this restaurant
    location: {
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },

    usersReviews: [{
      userName: { type: String, required: true },
      tags: [{ 
        value: { type: String },
      }],  
      reviews: [{
        date: { type: Date, default: Date.now, required: true },
        comments: { type: String },
        rating: { type: Number, required: true },
        wouldReturn: { type: Boolean },
      }],
    }],
  },
  { minimize: false },
);

export default mongoose.model('Restaurant', RestaurantSchema);
