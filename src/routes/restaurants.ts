import express from 'express';
import { 
  createRestaurant,
  updateRestaurant,
  addRestaurantReview,
} from '../controllers/restaurant';

const restaurantsRouter = express.Router();

restaurantsRouter.post('/restaurant', createRestaurant);
restaurantsRouter.post('/restaurantReview/:id', addRestaurantReview);
restaurantsRouter.patch('/restaurant/:id', updateRestaurant);

export default restaurantsRouter;
