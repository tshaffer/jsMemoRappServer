import express from 'express';
import {
  addUserReview,
  createRestaurant,
  createUserReviews,
  updateRestaurant,
  yelpRestaurantsByLocation,
  filteredRestaurants,
  restaurantsByLocation,
  restaurantsSearch,
} from '../controllers/restaurant';
import { populateDb } from '../controllers/testEndpoints';

const restaurantsRouter = express.Router();

restaurantsRouter.get('/yelpRestaurants', yelpRestaurantsByLocation);
restaurantsRouter.get('/restaurantsByLocation', restaurantsByLocation);
restaurantsRouter.post('/restaurantsSearch', restaurantsSearch);
restaurantsRouter.post('/filteredRestaurants', filteredRestaurants);

restaurantsRouter.post('/restaurant', createRestaurant);
restaurantsRouter.post('/restaurantReview', addUserReview);
restaurantsRouter.post('/userReviews/:id', createUserReviews);
restaurantsRouter.patch('/restaurant/:id', updateRestaurant);

// TEDTODO - couldn't get multiple parameters to work....
// restaurantsRouter.post('restaurantReview/:restaurantId/userName/:userName', addUserReview);

restaurantsRouter.post('/populateDb', populateDb);

export default restaurantsRouter;
