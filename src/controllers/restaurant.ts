import { isNil } from 'lodash';
import { Request, Response } from 'express';
import { Document } from 'mongoose';
import Restaurant from '../models/Restaurant';
import { createRestaurantDocument } from './dbInterface';
import { fetchYelpBusinessByLocation } from './yelp';
import {
  RestaurantEntity,
  FilterSpec,
  GeoLocationSpec,
  ReviewEntity,
  UserReviewsEntity,
  TagEntity,
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
*/
export function createRestaurant(request: Request, response: Response, next: any) {

  const { id, name, yelpBusinessDetails, location } = request.body;
  const restaurantEntity: RestaurantEntity = {
    id,
    name,
    yelpBusinessDetails,
    usersReviews: [],
    location,
  };
  createRestaurantDocument(restaurantEntity)
    .then((restaurantDoc) => {
      const restaurantDocument = restaurantDoc as Document;
      response.status(201).json({
        success: true,
        data: restaurantDocument,
      });
    });
}

export function createUserReviews(request: Request, response: Response, next: any) {

  const { id, userName, tags } = request.body;

  Restaurant.findById(request.params.id, (err, restaurant) => {
    if (request.body._id) {
      delete request.body._id;
    }
    const userReviewsEntity: UserReviewsEntity = {
      userName,
      tags,
      reviews: [],
    };
    (restaurant as any).usersReviews.push(userReviewsEntity);
    restaurant.save();
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

  Restaurant.findById(restaurantDbId, (err, restaurantDoc) => {

    let matchedUsersReview: UserReviewsEntity = null;

    // TEDTODO - 'any' blech
    for (const usersReview of (restaurantDoc as any).usersReviews) {
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
      (restaurantDoc as any).usersReviews.push(userReviewEntity);
    }

    // markModified?
    restaurantDoc.save();
    response.json(restaurantDoc);

  });

}

// export function addRestaurantReview(request: Request, response: Response, next: any) {
//   Restaurant.findById(request.params.id, (err, restaurant) => {
//     if (request.body._id) {
//       delete request.body._id;
//     }

//     const restaurantEntity: RestaurantEntity = restaurant as unknown as RestaurantEntity;
//     const { comments, date, rating, userName, userTags, wouldReturn } = request.body;
//     const jsDate = new Date(date);

//     const reviewEntity: ReviewEntity = {
//       userName,
//       date: jsDate,
//       comments,
//       rating,
//       wouldReturn,
//     };

//     (restaurant as unknown as RestaurantEntity).reviews.push(reviewEntity);

//     // restaurant.markModified('reviewsByUser');
//     restaurant.save();
//     response.json(restaurant);
//   });
// }

/*
    GET
    {{URL}}/api/v1/yelpRestaurants?latitude=37.378424&longitude=-122.117042
*/
export function yelpRestaurantsByLocation(request: Request, response: Response, next: any) {
  const latitude: number = parseFloat(request.query.latitude);
  const longitude: number = parseFloat(request.query.longitude);

  console.log('latitude: ', latitude);
  console.log('longitude: ', longitude);

  return fetchYelpBusinessByLocation(latitude, longitude, 50, 'distance', 'food').then((responseData: any) => {
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

export function restaurantsByLocation(request: Request, response: Response, next: any) {

  const latitude: number = parseFloat(request.query.latitude);
  const longitude: number = parseFloat(request.query.longitude);

  let yelpRestaurantData: any = null;

  return fetchYelpBusinessByLocation(latitude, longitude, 50, 'distance', 'food')
    .then((restaurantData) => {
      yelpRestaurantData = restaurantData;
      console.log(yelpRestaurantData);
      return getMemoRappRestaurantsByLocation(latitude, longitude, 50)
        .then((memoRappRestaurantData: any) => {
          console.log(memoRappRestaurantData);
          response.status(201).json({
            success: true,
            memoRappRestaurants: memoRappRestaurantData.restaurants,
            yelpRestaurants: yelpRestaurantData.businesses,
          });
        });
    });
}


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

