import express from 'express';
import {
  addUserReview,
  createRestaurant,
  createUserReviews,
  updateRestaurant,
  // addRestaurantReview,
  yelpRestaurantsByLocation,
  filteredRestaurants,
  restaurantsByLocation,
} from '../controllers/restaurant';
import { populateDb } from '../controllers/testEndpoints';

const restaurantsRouter = express.Router();

restaurantsRouter.get('/yelpRestaurants', yelpRestaurantsByLocation);
restaurantsRouter.get('/restaurantsByLocation', restaurantsByLocation);
restaurantsRouter.post('/filteredRestaurants', filteredRestaurants);

restaurantsRouter.post('/restaurant', createRestaurant);
// restaurantsRouter.post('restaurantReview/:restaurantId/userName/:userName', addUserReview);
restaurantsRouter.post('/restaurantReview', addUserReview);
restaurantsRouter.post('/userReviews/:id', createUserReviews);
// restaurantsRouter.post('/restaurantReview/:id', addRestaurantReview);
restaurantsRouter.patch('/restaurant/:id', updateRestaurant);

restaurantsRouter.post('/populateDb', populateDb);

export default restaurantsRouter;
