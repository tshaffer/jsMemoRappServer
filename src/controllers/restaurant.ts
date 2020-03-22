import { isNil } from 'lodash';
import { Request, Response } from 'express';
import { Document } from 'mongoose';
import Restaurant from '../models/Restaurant';
import {
  RestaurantEntity,
  RestaurantReviewEntity,
  RestaurantVisitReviewEntity,
} from '../types/entities';
import { createRestaurantDocument } from './dbInterface';
import { isNullOrUndefined } from 'util';

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
  console.log('createRestaurant');
  console.log(request.body);

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
      console.log('added restaurantDocument');
      console.log(restaurantDocument);
      console.log(restaurantDocument.toObject());

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
    console.log(restaurant);
    console.log(restaurant.toObject());

    const { comments, date, rating, userName, userTags, wouldReturn } = request.body;
    const jsDate = new Date(date);

    const restaurantVisitReviewEntity: RestaurantVisitReviewEntity = {
      date: jsDate,
      comments,
      rating,
    };

    // find the reviews for this user
    let matchedUserReviews: RestaurantReviewEntity = null;
    for (const userReviewsAny of (restaurant as any).reviews) {
      const userReviews: RestaurantReviewEntity = userReviewsAny as RestaurantReviewEntity;
      if (userReviews.userName === userName) {
        matchedUserReviews = userReviews;
        break;
      }
    }
    if (isNil(matchedUserReviews)) {
      matchedUserReviews = {
        userName,
        wouldReturn,
        userTags,
        visitReviews: [restaurantVisitReviewEntity],
      };
      (restaurant as any).reviews.push(matchedUserReviews);
    } else {
      matchedUserReviews.wouldReturn = wouldReturn;
      // userTags?
      matchedUserReviews.visitReviews.push(restaurantVisitReviewEntity);
    }

    // const restaurantReviewEntity: RestaurantReviewEntity = {
    //   userName,
    //   userTags,
    //   wouldReturn,
    //   visitReviews: [restaurantVisitReviewEntity],
    // };

    // (restaurant as any).reviews.push(restaurantReviewEntity);

    restaurant.save();
    response.json(restaurant);
  });

}

