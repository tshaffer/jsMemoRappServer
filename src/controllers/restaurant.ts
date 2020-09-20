import { isNil, isString } from 'lodash';
import { Request, Response } from 'express';
import { Document } from 'mongoose';
import Restaurant from '../models/Restaurant';
import { createRestaurantDocument } from './dbInterface';
import {
  fetchYelpBusinessByGeoLocation,
  fetchYelpBusinessBySearchTerm,
  fetchYelpBusinessesByGeolocation,
  fetchYelpBusinessesBySearchTerm,
} from './yelp';
import {
  RestaurantEntity,
  FilterSpec,
  GeoLocationSpec,
  ReviewEntity,
  UserReviewsEntity,
  YelpRestaurant,
  YelpSearchRegion,
} from '../types';

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

    yelpSearchRegion:
    { center: { longitude: -122.115733, latitude: 37.380557 } }
    { center: { longitude: -122.04299926757812, latitude: 37.32210920065857 } }
    { center: { longitude: -73.99429321289062, latitude: 40.70544486444615 } }
*/
export function createRestaurant(request: Request, response: Response, next: any) {

  console.log('createRestaurant');

  const { id, name, yelpBusinessDetails, location } = request.body;
  const restaurantEntity: RestaurantEntity = {
    id,
    name,
    yelpBusinessDetails,
    usersReviews: [],
    location: {
      type: 'Point',
      coordinates: [location.coordinates.longitude, location.coordinates.latitude],
    },
  };
  createRestaurantDocument(restaurantEntity)
    .then((restaurantDoc: Document) => {
      const restaurantDocument = restaurantDoc as Document;
      response.status(201).json({
        success: true,
        data: restaurantDocument,
      });
    }).catch((err: any) => {
      console.log('ERROR - createRestaurant: ', err);
    });
}

export function createUserReviews(request: Request, response: Response, next: any) {

  const { id, userName, tags } = request.body;

  Restaurant.findById(request.params.id, (err, restaurant: RestaurantEntity) => {
    if (request.body._id) {
      delete request.body._id;
    }

    const userReviewsEntity: UserReviewsEntity = {
      userName,
      tags,
      reviews: [],
    };
    restaurant.usersReviews.push(userReviewsEntity);

    (restaurant as unknown as Document).save();
    response.json(restaurant);
  });
}

/*  PATCH
    {{URL}}/api/v1/restaurant/<restaurant id>>
    {
      '<restaurant property>': <restaurant property value>
    }
*/
export function updateRestaurant(request: Request, response: Response, next: any) {
  console.log('updateRestaurant');
  console.log(request.body);

  Restaurant.findById(request.params.id, (err, restaurant) => {
    if (request.body._id) {
      delete request.body._id;
    }
    for (const b in request.body) {
      if (request.body.hasOwnProperty(b)) {
        (restaurant as any)[b] = request.body[b];
      }
    }
    restaurant.save();
    response.json(restaurant);
  });
}

export function addUserReview(request: Request, response: Response, next: any) {

  const { restaurantDbId, userName, tags, date, rating, wouldReturn, comments } = request.body;

  console.log(request.body);

  Restaurant.findById(restaurantDbId, (err, restaurant: RestaurantEntity) => {

    let matchedUsersReview: UserReviewsEntity = null;

    for (const usersReview of restaurant.usersReviews) {
      if (usersReview.userName === userName) {
        matchedUsersReview = usersReview;
      }
    }

    const review: ReviewEntity = {
      date,
      comments,
      rating,
      wouldReturn,
    };

    if (!isNil(matchedUsersReview)) {
      matchedUsersReview.tags = tags;
      matchedUsersReview.reviews.push(review);
    }
    else {
      const userReviewEntity: UserReviewsEntity = {
        userName,
        tags,
        reviews: [review],
      };
      restaurant.usersReviews.push(userReviewEntity);
    }

    // markModified?
    (restaurant as unknown as Document).save();
    response.json(restaurant);

  });

}

/*
    GET
    {{URL}}/api/v1/yelpRestaurants?latitude=37.378424&longitude=-122.117042
*/
export function yelpRestaurantsByLocation(request: Request, response: Response, next: any) {
  const latitude: number = parseFloat(request.query.latitude);
  const longitude: number = parseFloat(request.query.longitude);

  console.log('latitude: ', latitude);
  console.log('longitude: ', longitude);

  return fetchYelpBusinessByGeoLocation(latitude, longitude, 50, 'distance', 'food').then((responseData: any) => {
    response.json(responseData);
  });
}

function getMemoRappRestaurantsByLocation(
  latitude: number,
  longitude: number,
  radius: number,
): Promise<any> {

  console.log('latitude: ', latitude);
  console.log('longitude: ', longitude);

  const location: GeoLocationSpec = {
    coordinates: [longitude, latitude],
    maxDistance: radius,
  };
  const geoNearSpec = getGeoNearSpec(location);
  const aggregateQuery: any[] = [];
  addQuerySpecIfNonNull(aggregateQuery, { $geoNear: geoNearSpec });

  return new Promise((resolve, reject) => {
    Restaurant.aggregate(aggregateQuery).exec((err, restaurants) => {
      if (err) {
        return reject(err);
      }
      return resolve({
        restaurants,
      });
    });
  });
}

export function restaurantsByGeoLocation(request: Request, response: Response, next: any) {

  const latitude: number = parseFloat(request.query.latitude);
  const longitude: number = parseFloat(request.query.longitude);

  let yelpRestaurants: any = null;

  return fetchYelpBusinessByGeoLocation(latitude, longitude, 50, 'distance', 'food')
    .then((restaurantData) => {
      yelpRestaurants = restaurantData;
      console.log(yelpRestaurants);
      return getMemoRappRestaurantsByLocation(latitude, longitude, 50)
        .then((memoRappRestaurantData: any) => {
          console.log(memoRappRestaurantData);
          response.status(201).json({
            success: true,
            memoRappRestaurants: memoRappRestaurantData.restaurants,
            yelpRestaurants: yelpRestaurants.businesses,
          });
        });
    });
}

export function restaurantsBySearchTerm(request: Request, response: Response, next: any) {

  console.log('restaurantsBySearchTerm');
  console.log(request.query);

  const location: string = request.query.location;
  console.log('location');
  console.log(location);

  let term: string = 'restaurants';
  if (isString(request.query.term) && request.query.term.length > 0) {
    term = request.query.term;
  }

  let yelpRestaurants: any = null;

  // return fetchYelpBusinessBySearchTerm(location, term, 50, 'distance')
  return fetchYelpBusinessBySearchTerm(location, term, 2500, 'best_match')
    .then((restaurantData) => {
      yelpRestaurants = restaurantData;
      console.log(yelpRestaurants);
      response.status(201).json({
        success: true,
        memoRappRestaurants: [],
        yelpRestaurants: yelpRestaurants.businesses,
      });
      // return getMemoRappRestaurantsByLocation(latitude, longitude, 50)
      //   .then((memoRappRestaurantData: any) => {
      //     console.log(memoRappRestaurantData);
      //     response.status(201).json({
      //       success: true,
      //       memoRappRestaurants: memoRappRestaurantData.restaurants,
      //       yelpRestaurants: yelpRestaurants.businesses,
      //     });
      //   });
    });
}

// businesses/search?term=restaurants&location=cupertino&radius=50&sort_by=distance
// businesses/search?term=restaurants&location=cupertino&radius=2500&sort_by=best_match&categories=&limit=10

export function restaurantsSearchByGeolocation(request: Request, response: Response, next: any) {

  console.log(request.body);

  const userName: string = request.body.userName;

  const location: GeoLocationSpec = request.body.location;
  const longitude: number = location.coordinates[0];
  const latitude: number = location.coordinates[1];
  console.log('location');

  const tags: string[] = request.body.tags;
  let tagsString = '';
  tags.forEach((tag: string, index: number) => {
    tagsString = tagsString + tag.toLowerCase();
    if (index < (tags.length - 1)) {
      tagsString = tagsString + ',';
    }
  });

  const sortBy = 'best_match';
  const term = 'restaurants';

  // retrieve yelp restaurants
  fetchYelpBusinessesByGeolocation(
    latitude,
    longitude,
    2500, // search radius in meters
    sortBy,
    term,
    tagsString,
    10,
  )
    .then((yelpBusinesses) => {

      const yelpRestaurants: YelpRestaurant[] = yelpBusinesses.businesses;
      const yelpSearchRegion: YelpSearchRegion = yelpBusinesses.region;
      console.log('yelpSearchRegion');
      console.log(yelpSearchRegion);
      console.log(yelpSearchRegion.center.latitude);
      console.log(yelpSearchRegion.center.longitude);

      // retrieve memoRapp restaurants filtered by location, userName, and tags
      const aggregateQuery = getMemoRappRestaurantSearchQuery(location, userName, tags);

      Restaurant.aggregate(aggregateQuery).exec((err, memoRappRestaurants) => {
        if (err) {
          console.log('err: ' + err);
        } else {
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

export function restaurantsSearchBySearchTerm(request: Request, response: Response, next: any) {

  console.log(request.body);

  const userName: string = request.body.userName;

  const location: string = request.body.location;
  console.log('location');
  console.log(location);

  let term: string = request.body.term;
  console.log('term');
  console.log(term);
  if (term === '') {
    term = 'restaurants';
  }

  const tags: string[] = request.body.tags;
  let tagsString = '';
  tags.forEach((tag: string, index: number) => {
    tagsString = tagsString + tag.toLowerCase();
    if (index < (tags.length - 1)) {
      tagsString = tagsString + ',';
    }
  });

  const sortBy = 'best_match';

  // retrieve yelp restaurants
  fetchYelpBusinessesBySearchTerm(
    location,
    term,
    2500, // search radius in meters
    sortBy,
    tagsString,
    10,
  )
    .then((yelpBusinesses) => {

      const yelpRestaurants: YelpRestaurant[] = yelpBusinesses.businesses;
      const yelpSearchRegion: YelpSearchRegion = yelpBusinesses.region;
      console.log('yelpSearchRegion');
      console.log(yelpSearchRegion);
      console.log(yelpSearchRegion.center.latitude);
      console.log(yelpSearchRegion.center.longitude);

      // response.status(201).json({
      //   success: true,
      //   yelpRestaurants,
      //   memoRappRestaurants: [],
      // });

      // retrieve memoRapp restaurants filtered by location, userName, and tags
      const searchLocation: GeoLocationSpec = {
        coordinates: [yelpSearchRegion.center.longitude, yelpSearchRegion.center.latitude],
        maxDistance: 2500,
      };
      const aggregateQuery = getMemoRappRestaurantSearchQuery(searchLocation, userName, tags);

      Restaurant.aggregate(aggregateQuery).exec((err, memoRappRestaurants) => {
        if (err) {
          console.log('err: ' + err);
        } else {
          memoRappRestaurants = filterRestaurantsByTags(memoRappRestaurants, tags);
          response.status(201).json({
            success: true,
            yelpRestaurants,
            memoRappRestaurants,
          });
        }
      });
    });
}

export function filteredRestaurants(request: Request, response: Response, next: any) {

  const filteredRestaurantsQuery: any = getFilteredRestaurantsQuery(request.body.filterSpec);

  Restaurant.aggregate(filteredRestaurantsQuery)
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

function getMemoRappRestaurantSearchQuery(location: GeoLocationSpec, userName: string, tags: string[]): any {

  const geoNearSpec = getGeoNearSpec(location);
  const restaurantProjectSpec: any = getRestaurantProjectSpec();

  const usersReviewsUserNameSpec: any = getUsersReviewsElemMatchSpec(userName);

  // the following didn't work!!
  // const usersReviewsTagsSpec: any = getUsersReviewsTagsElemMatchSpec(tags);
  // const usersReviewsUserNameSpec: any = getUsersReviewsUserNameMatchSpec(userName);
  // const usersReviewsTagsSpec: any = getUsersReviewsTagsMatchSpec(tags);

  const aggregateQuery: any[] = [];
  addQuerySpecIfNonNull(aggregateQuery, { $geoNear: geoNearSpec });
  addQuerySpecIfNonNull(aggregateQuery, { $project: restaurantProjectSpec });
  addQuerySpecIfNonNull(aggregateQuery, { $match: usersReviewsUserNameSpec });
  // addQuerySpecIfNonNull(aggregateQuery, { $match: usersReviewsTagsSpec });
  // addQuerySpecIfNonNull(aggregateQuery, { $match: usersReviewsUserNameSpec });
  // addQuerySpecIfNonNull(aggregateQuery, { $match: usersReviewsTagsSpec });

  return aggregateQuery;
}

function filterRestaurantsByTags(memoRappRestaurants: RestaurantEntity[], tags: string[]): RestaurantEntity[] {
  const memoRappRestaurantsWithMatchingTag: RestaurantEntity[] = [];

  for (const memoRappRestaurant of memoRappRestaurants) {
    console.log(memoRappRestaurant);
    for (const userReviews of memoRappRestaurant.usersReviews) {
      const reviewTagEntities = userReviews.tags;
      const reviewTags = reviewTagEntities.map((reviewTagEntity) => {
        return reviewTagEntity.value;
      });
      const found = reviewTags.some((r) => tags.indexOf(r) >= 0);
      if (found || tags.length === 0) {
        memoRappRestaurantsWithMatchingTag.push(memoRappRestaurant);
      }
    }
  }

  return memoRappRestaurantsWithMatchingTag;
}

export function getFilteredRestaurantsQuery(filterSpec: FilterSpec): any {

  const geoNearSpec = getGeoNearSpec(filterSpec.location);
  const firstMatchSpec = getFirstMatchSpec(filterSpec);
  const firstProjectSpec = getFirstProjectSpec(filterSpec);

  const aggregateQuery: any[] = [];
  addQuerySpecIfNonNull(aggregateQuery, { $geoNear: geoNearSpec });
  addQuerySpecIfNonNull(aggregateQuery, { $match: firstMatchSpec });
  addQuerySpecIfNonNull(aggregateQuery, { $project: firstProjectSpec });

  return aggregateQuery;

}

function addQuerySpecIfNonNull(aggregateQuery: any[], querySpec: any) {
  if (!isNil(querySpec)) {
    aggregateQuery.push(querySpec);
  }
}

// PIPELINE SPEC BUILDERS

function getGeoNearSpec(locationSpec: GeoLocationSpec): any {

  if (!isNil(locationSpec)) {
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
function getFirstMatchSpec(filterSpec: FilterSpec): any {

  const matchSpec: any = {};

  if (filterSpec.hasOwnProperty('tags')) {
    const tagsMatchQuery = getTagsMatchSpecHelper(filterSpec.tags);
    matchSpec.tags = tagsMatchQuery;
  }

  // possibly add specs that need to check for existence of filter spec properties

  return matchSpec;
}

function getTagsMatchSpecHelper(tags: string[]): any {
  const specifiedCategories: any = {};
  specifiedCategories.$in = tags;
  return specifiedCategories;
}

function getFirstProjectSpec(filterSpec: FilterSpec): any {

  const projectSpec: any = {};

  projectSpec.restaurantName = 1;
  projectSpec._id = 0;

  return projectSpec;
}

function getRestaurantProjectSpec(): any {

  const projectSpec: any = {};

  projectSpec.name = 1;
  projectSpec.restaurantName = 1;
  projectSpec.dist = 1;
  projectSpec.yelpBusinessDetails = 1;
  projectSpec.usersReviews = 1;
  projectSpec.location = 1;
  projectSpec._id = 0;

  return projectSpec;
}

function getUsersReviewsElemMatchSpec(userName: string): any {
  const matchSpec: any = {};
  matchSpec.usersReviews = {
    $elemMatch: {
      userName,
    },
  };

  return matchSpec;
}

function getUsersReviewsTagsElemMatchSpec(tags: string[]): any {
  const matchSpec: any = {};
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
function getUsersReviewsUserNameMatchSpec(userName: string): any {

  const matchSpec: any = {};
  matchSpec.usersReviews = {
    userName: {
      $in: [userName],
    },
  };

  return matchSpec;
}

function getUsersReviewsTagsMatchSpec(tags: string[]): any {

  const matchSpec: any = {};
  matchSpec.usersReviews = {
    tags: {
      value: {
        $in: tags,
      },
    },
  };

  return matchSpec;
}
