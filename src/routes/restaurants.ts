import express from 'express';
import { 
  createRestaurant,
  updateRestaurant,
  addRestaurantReview,
  getYelpRestaurants,
} from '../controllers/restaurant';

const restaurantsRouter = express.Router();

restaurantsRouter.get('/yelpRestaurants', getYelpRestaurants);

restaurantsRouter.post('/restaurant', createRestaurant);
restaurantsRouter.post('/restaurantReview/:id', addRestaurantReview);
restaurantsRouter.patch('/restaurant/:id', updateRestaurant);

export default restaurantsRouter;
