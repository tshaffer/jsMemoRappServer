"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const Restaurant_1 = __importDefault(require("../models/Restaurant"));
const dbInterface_1 = require("./dbInterface");
const yelp_1 = require("./yelp");
// RESTAURANTS
/*  POST
    {{URL}}/api/v1/restaurant
    Body
    {
      "restaurantName": "La Costeña",
      "yelpBusinessDetails": [],
      "tags": [
        "taqueria",
        "burritos",
        "carnitas"
      ]
    }
*/
function createRestaurant(request, response, next) {
    console.log('createRestaurant');
    const { id, name, yelpBusinessDetails, location } = request.body;
    const restaurantEntity = {
        id,
        name,
        yelpBusinessDetails,
        usersReviews: [],
        location: {
            type: 'Point',
            coordinates: [location.coordinates.longitude, location.coordinates.latitude],
        },
    };
    dbInterface_1.createRestaurantDocument(restaurantEntity)
        .then((restaurantDoc) => {
        const restaurantDocument = restaurantDoc;
        response.status(201).json({
            success: true,
            data: restaurantDocument,
        });
    }).catch((err) => {
        console.log('ERROR - createRestaurant: ', err);
    });
}
exports.createRestaurant = createRestaurant;
function createUserReviews(request, response, next) {
    const { id, userName, tags } = request.body;
    Restaurant_1.default.findById(request.params.id, (err, restaurant) => {
        if (request.body._id) {
            delete request.body._id;
        }
        const userReviewsEntity = {
            userName,
            tags,
            reviews: [],
        };
        restaurant.usersReviews.push(userReviewsEntity);
        restaurant.save();
        response.json(restaurant);
    });
}
exports.createUserReviews = createUserReviews;
/*  PATCH
    {{URL}}/api/v1/restaurant/<restaurant id>>
    {
      '<restaurant property>': <restaurant property value>
    }
*/
function updateRestaurant(request, response, next) {
    console.log('updateRestaurant');
    console.log(request.body);
}
exports.updateRestaurant = updateRestaurant;
function addUserReview(request, response, next) {
    console.log(request.body);
}
exports.addUserReview = addUserReview;
/*
    GET
    {{URL}}/api/v1/yelpRestaurants?latitude=37.378424&longitude=-122.117042
*/
function yelpRestaurantsByLocation(request, response, next) {
    const latitude = parseFloat(request.query.latitude);
    const longitude = parseFloat(request.query.longitude);
    console.log('latitude: ', latitude);
    console.log('longitude: ', longitude);
    return yelp_1.fetchYelpBusinessByLocation(latitude, longitude, 50, 'distance', 'food').then((responseData) => {
        response.json(responseData);
    });
}
exports.yelpRestaurantsByLocation = yelpRestaurantsByLocation;
function getMemoRappRestaurantsByLocation(latitude, longitude, radius) {
    console.log('latitude: ', latitude);
    console.log('longitude: ', longitude);
    const location = {
        coordinates: [longitude, latitude],
        maxDistance: radius,
    };
    const geoNearSpec = getGeoNearSpec(location);
    const aggregateQuery = [];
    addQuerySpecIfNonNull(aggregateQuery, { $geoNear: geoNearSpec });
    return new Promise((resolve, reject) => {
        Restaurant_1.default.aggregate(aggregateQuery).exec((err, restaurants) => {
            if (err) {
                return reject(err);
            }
            return resolve({
                restaurants,
            });
        });
    });
}
function restaurantsByLocation(request, response, next) {
    const latitude = parseFloat(request.query.latitude);
    const longitude = parseFloat(request.query.longitude);
    let yelpRestaurants = null;
    return yelp_1.fetchYelpBusinessByLocation(latitude, longitude, 50, 'distance', 'food')
        .then((restaurantData) => {
        yelpRestaurants = restaurantData;
        console.log(yelpRestaurants);
        return getMemoRappRestaurantsByLocation(latitude, longitude, 50)
            .then((memoRappRestaurantData) => {
            console.log(memoRappRestaurantData);
            response.status(201).json({
                success: true,
                memoRappRestaurants: memoRappRestaurantData.restaurants,
                yelpRestaurants: yelpRestaurants.businesses,
            });
        });
    });
}
exports.restaurantsByLocation = restaurantsByLocation;
function restaurantsSearch(request, response, next) {
    console.log(request.body);
    const userName = request.body.userName;
    const location = request.body.location;
    const longitude = location.coordinates[0];
    const latitude = location.coordinates[1];
    console.log('location');
    const tags = request.body.tags;
    let tagsString = '';
    tags.forEach((tag, index) => {
        tagsString = tagsString + tag.toLowerCase();
        if (index < (tags.length - 1)) {
            tagsString = tagsString + ',';
        }
    });
    const sortBy = 'best_match';
    const term = 'restaurants';
    // retrieve yelp restaurants
    yelp_1.fetchYelpBusinesses(latitude, longitude, 2500, // search radius in meters
    sortBy, term, tagsString, 10)
        .then((yelpBusinesses) => {
        const yelpRestaurants = yelpBusinesses.businesses;
        // retrieve memoRapp restaurants filtered by location, userName, and tags
        const aggregateQuery = getMemoRappRestaurantSearchQuery(location, userName, tags);
        Restaurant_1.default.aggregate(aggregateQuery).exec((err, memoRappRestaurants) => {
            if (err) {
                console.log('err: ' + err);
            }
            else {
                memoRappRestaurants = filterRestaurantsByTags(memoRappRestaurants, tags);
                response.status(201).json({
                    success: true,
                    yelpRestaurants,
                    memoRappRestaurants,
                });
            }
        });
    });
    /*
  [
    {
      '$geoNear': {
        'near': {
          'type': 'Point',
          'coordinates': [
            -122.061109, 37.397566
          ]
        },
        'distanceField': 'dist.calculated',
        'maxDistance': 10000,
        'includeLocs': 'dist.location',
        'spherical': true
      }
    }, {
      '$project': {
        'name': 1,
        'restaurantName': 1,
        'dist': 1,
        'yelpBusinessDetails': 1,
        'usersReviews': 1,
        'location': 1
      }
    }, {
      '$match': {
        'usersReviews.userName': {
          '$in': [
            'ted', 'Lori'
          ]
        }
      }
    }, {
      '$match': {
        'usersReviews.tags.value': {
          '$in': [
            'Pizza', 'Pasta'
          ]
        }
      }
    }
  ]
    */
}
exports.restaurantsSearch = restaurantsSearch;
/*
{{URL}}/api/v1/filteredRestaurants

example bodies

{
  "filters": {
    "tags": [ "carnitas" ],
    "reviewers": ["Ted", "Joel"]
  }
}

{
    "filterSpec": {
        "location": {
            "coordinates": [ -122.147944, 37.392333  ],
            "maxDistance": 40000
        },
        "tags": [ "burritos", "taqueria" ]
    }
}

{
    "filterSpec": {
    "tags": [ "burritos" ],
    "reviewers": ["Ted"]
}

also:
- wouldReturn
- visitReviews
--    date
--    rating
- anything from yelpBusinessDetails?
*/
function filteredRestaurants(request, response, next) {
    const filteredRestaurantsQuery = getFilteredRestaurantsQuery(request.body.filterSpec);
    Restaurant_1.default.aggregate(filteredRestaurantsQuery)
        .exec((err, restaurants) => {
        if (err) {
            throw err;
        }
        response.status(201).json({
            success: true,
            restaurants,
        });
    });
}
exports.filteredRestaurants = filteredRestaurants;
function getMemoRappRestaurantSearchQuery(location, userName, tags) {
    const geoNearSpec = getGeoNearSpec(location);
    const restaurantProjectSpec = getRestaurantProjectSpec();
    const usersReviewsUserNameSpec = getUsersReviewsElemMatchSpec(userName);
    // the following didn't work!!
    // const usersReviewsTagsSpec: any = getUsersReviewsTagsElemMatchSpec(tags);
    // const usersReviewsUserNameSpec: any = getUsersReviewsUserNameMatchSpec(userName);
    // const usersReviewsTagsSpec: any = getUsersReviewsTagsMatchSpec(tags);
    const aggregateQuery = [];
    addQuerySpecIfNonNull(aggregateQuery, { $geoNear: geoNearSpec });
    addQuerySpecIfNonNull(aggregateQuery, { $project: restaurantProjectSpec });
    addQuerySpecIfNonNull(aggregateQuery, { $match: usersReviewsUserNameSpec });
    // addQuerySpecIfNonNull(aggregateQuery, { $match: usersReviewsTagsSpec });
    // addQuerySpecIfNonNull(aggregateQuery, { $match: usersReviewsUserNameSpec });
    // addQuerySpecIfNonNull(aggregateQuery, { $match: usersReviewsTagsSpec });
    return aggregateQuery;
}
function filterRestaurantsByTags(memoRappRestaurants, tags) {
    const memoRappRestaurantsWithMatchingTag = [];
    for (const memoRappRestaurant of memoRappRestaurants) {
        console.log(memoRappRestaurant);
        for (const userReviews of memoRappRestaurant.usersReviews) {
            const reviewTagEntities = userReviews.tags;
            const reviewTags = reviewTagEntities.map((reviewTagEntity) => {
                return reviewTagEntity.value;
            });
            const found = reviewTags.some((r) => tags.indexOf(r) >= 0);
            if (found) {
                memoRappRestaurantsWithMatchingTag.push(memoRappRestaurant);
            }
        }
    }
    return memoRappRestaurantsWithMatchingTag;
}
function getFilteredRestaurantsQuery(filterSpec) {
    const geoNearSpec = getGeoNearSpec(filterSpec.location);
    const firstMatchSpec = getFirstMatchSpec(filterSpec);
    const firstProjectSpec = getFirstProjectSpec(filterSpec);
    const aggregateQuery = [];
    addQuerySpecIfNonNull(aggregateQuery, { $geoNear: geoNearSpec });
    addQuerySpecIfNonNull(aggregateQuery, { $match: firstMatchSpec });
    addQuerySpecIfNonNull(aggregateQuery, { $project: firstProjectSpec });
    return aggregateQuery;
}
exports.getFilteredRestaurantsQuery = getFilteredRestaurantsQuery;
function addQuerySpecIfNonNull(aggregateQuery, querySpec) {
    if (!lodash_1.isNil(querySpec)) {
        aggregateQuery.push(querySpec);
    }
}
// PIPELINE SPEC BUILDERS
function getGeoNearSpec(locationSpec) {
    if (!lodash_1.isNil(locationSpec)) {
        return {
            near: {
                type: 'Point',
                coordinates: locationSpec.coordinates,
            },
            distanceField: 'dist.calculated',
            maxDistance: locationSpec.maxDistance,
            includeLocs: 'dist.location',
            spherical: true,
        };
    }
    return null;
}
// {
//   tags: { $in: ['burritos'] }
// }
function getFirstMatchSpec(filterSpec) {
    const matchSpec = {};
    if (filterSpec.hasOwnProperty('tags')) {
        const tagsMatchQuery = getTagsMatchSpecHelper(filterSpec.tags);
        matchSpec.tags = tagsMatchQuery;
    }
    // possibly add specs that need to check for existence of filter spec properties
    return matchSpec;
}
function getTagsMatchSpecHelper(tags) {
    const specifiedCategories = {};
    specifiedCategories.$in = tags;
    return specifiedCategories;
}
function getFirstProjectSpec(filterSpec) {
    const projectSpec = {};
    projectSpec.restaurantName = 1;
    projectSpec._id = 0;
    return projectSpec;
}
function getRestaurantProjectSpec() {
    const projectSpec = {};
    projectSpec.name = 1;
    projectSpec.restaurantName = 1;
    projectSpec.dist = 1;
    projectSpec.yelpBusinessDetails = 1;
    projectSpec.usersReviews = 1;
    projectSpec.location = 1;
    projectSpec._id = 0;
    return projectSpec;
}
function getUsersReviewsElemMatchSpec(userName) {
    const matchSpec = {};
    matchSpec.usersReviews = {
        $elemMatch: {
            userName,
        },
    };
    return matchSpec;
}
function getUsersReviewsTagsElemMatchSpec(tags) {
    const matchSpec = {};
    matchSpec.usersReviews = {
        tags: {
            $elemMatch: {
                value: tags[0],
            },
        },
    };
    return matchSpec;
}
// {
//   tags: { $in: ['burritos'] }
// }
function getUsersReviewsUserNameMatchSpec(userName) {
    const matchSpec = {};
    matchSpec.usersReviews = {
        userName: {
            $in: [userName],
        },
    };
    return matchSpec;
}
function getUsersReviewsTagsMatchSpec(tags) {
    const matchSpec = {};
    matchSpec.usersReviews = {
        tags: {
            value: {
                $in: tags,
            },
        },
    };
    return matchSpec;
}
//# sourceMappingURL=restaurant.js.map