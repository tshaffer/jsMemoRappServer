import express from 'express';
import {
  addUserReview,
  createRestaurant,
  createUserReviews,
  updateRestaurant,
  yelpRestaurantsByLocation,
  filteredRestaurants,
  restaurantsByGeoLocation,
  restaurantsBySearchTerm,
  restaurantsSearchByGeolocation,
  restaurantsSearchBySearchTerm,
} from '../controllers/restaurant';
import { populateDb, updateYelpData } from '../controllers/testEndpoints';

const restaurantsRouter = express.Router();

restaurantsRouter.get('/yelpRestaurants', yelpRestaurantsByLocation);
restaurantsRouter.get('/restaurantsByGeoLocation', restaurantsByGeoLocation);
restaurantsRouter.get('/restaurantsBySearchTerm', restaurantsBySearchTerm);
restaurantsRouter.post('/restaurantsSearchByGeolocation', restaurantsSearchByGeolocation);
restaurantsRouter.post('/restaurantsSearchBySearchTerm', restaurantsSearchBySearchTerm);
restaurantsRouter.post('/filteredRestaurants', filteredRestaurants);

restaurantsRouter.post('/restaurant', createRestaurant);
restaurantsRouter.post('/restaurantReview', addUserReview);
restaurantsRouter.post('/userReviews/:id', createUserReviews);
restaurantsRouter.patch('/restaurant/:id', updateRestaurant);

// TEDTODO - couldn't get multiple parameters to work....
// restaurantsRouter.post('restaurantReview/:restaurantId/userName/:userName', addUserReview);

restaurantsRouter.post('/populateDb', populateDb);
restaurantsRouter.post('/updateYelpData', updateYelpData);

export default restaurantsRouter;
