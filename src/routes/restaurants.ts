import express from 'express';
import { 
  createRestaurant,
  updateRestaurant,
  addRestaurantReview,
  yelpRestaurants,
  filteredRestaurants,
} from '../controllers/restaurant';

const restaurantsRouter = express.Router();

restaurantsRouter.get('/yelpRestaurants', yelpRestaurants);
restaurantsRouter.post('/filteredRestaurants', filteredRestaurants);

restaurantsRouter.post('/restaurant', createRestaurant);
restaurantsRouter.post('/restaurantReview/:id', addRestaurantReview);
restaurantsRouter.patch('/restaurant/:id', updateRestaurant);

export default restaurantsRouter;
