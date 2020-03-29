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
  RestaurantReviewEntity,
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

  const { restaurantName, yelpBusinessDetails, tags } = request.body;
  const restaurantEntity: RestaurantEntity = {
    restaurantName,
    yelpBusinessDetails,
    tags,
    reviews: [],
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

export function addRestaurantReview(request: Request, response: Response, next: any) {
  Restaurant.findById(request.params.id, (err, restaurant) => {
    if (request.body._id) {
      delete request.body._id;
    }

    const restaurantEntity: RestaurantEntity = restaurant as unknown as RestaurantEntity;
    const { comments, date, rating, userName, userTags, wouldReturn } = request.body;
    const jsDate = new Date(date);

    const reviewEntity: RestaurantReviewEntity = {
      userName,
      date: jsDate,
      comments,
      rating,
      wouldReturn,
    };

    (restaurant as unknown as RestaurantEntity).reviews.push(reviewEntity);

    // restaurant.markModified('reviewsByUser');
    restaurant.save();
    response.json(restaurant);
  });
}

/*
    GET
    {{URL}}/api/v1/yelpRestaurants?latitude=37.378424&longitude=-122.117042
*/
export function yelpRestaurants(request: Request, response: Response, next: any) {
  const latitude: number = parseFloat(request.query.latitude);
  const longitude: number = parseFloat(request.query.longitude);

  console.log('latitude: ', latitude);
  console.log('longitude: ', longitude);

  return fetchYelpBusinessByLocation(latitude, longitude, 50, 'distance', 'food').then((responseData: any) => {
    response.json(responseData);
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

  const geoNearSpec = getGeoNearSpec(filterSpec);
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

function getGeoNearSpec(filterSpec: FilterSpec): any {

  if (!isNil(filterSpec.location)) {
    const geoLocationSpec: GeoLocationSpec = filterSpec.location;
    return {
      near: {
        type: 'Point',
        coordinates: geoLocationSpec.coordinates,
      },
      distanceField: 'dist.calculated',
      maxDistance: geoLocationSpec.maxDistance,
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

