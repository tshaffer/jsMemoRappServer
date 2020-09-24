"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const restaurant_1 = require("../controllers/restaurant");
const testEndpoints_1 = require("../controllers/testEndpoints");
const restaurantsRouter = express_1.default.Router();
restaurantsRouter.get('/yelpRestaurants', restaurant_1.yelpRestaurantsByLocation);
restaurantsRouter.get('/restaurantsByGeoLocation', restaurant_1.restaurantsByGeoLocation);
restaurantsRouter.get('/restaurantsBySearchTerm', restaurant_1.restaurantsBySearchTerm);
restaurantsRouter.post('/restaurantsSearchByGeolocation', restaurant_1.restaurantsSearchByGeolocation);
restaurantsRouter.post('/restaurantsSearchBySearchTerm', restaurant_1.restaurantsSearchBySearchTerm);
restaurantsRouter.post('/filteredRestaurants', restaurant_1.filteredRestaurants);
restaurantsRouter.post('/restaurant', restaurant_1.createRestaurant);
restaurantsRouter.post('/restaurantReview', restaurant_1.addUserReview);
restaurantsRouter.post('/userReviews/:id', restaurant_1.createUserReviews);
restaurantsRouter.patch('/restaurant/:id', restaurant_1.updateRestaurant);
// TEDTODO - couldn't get multiple parameters to work....
// restaurantsRouter.post('restaurantReview/:restaurantId/userName/:userName', addUserReview);
restaurantsRouter.post('/populateDb', testEndpoints_1.populateDb);
restaurantsRouter.post('/updateYelpData', testEndpoints_1.updateYelpData);
exports.default = restaurantsRouter;
//# sourceMappingURL=restaurants.js.map