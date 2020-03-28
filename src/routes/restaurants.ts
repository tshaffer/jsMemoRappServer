import express from 'express';
import { 
  createRestaurant,
  updateRestaurant,
  addRestaurantReview,
  yelpRestaurants,
} from '../controllers/restaurant';

const restaurantsRouter = express.Router();

restaurantsRouter.get('/yelpRestaurants', yelpRestaurants);

restaurantsRouter.post('/restaurant', createRestaurant);
restaurantsRouter.post('/restaurantReview/:id', addRestaurantReview);
restaurantsRouter.patch('/restaurant/:id', updateRestaurant);

export default restaurantsRouter;
