import { isNil } from 'lodash';
import { Request, Response } from 'express';
import { Document } from 'mongoose';
import Restaurant from '../models/Restaurant';
import {
  RestaurantEntity,
  UserReviewsEntity,
  VisitReviewEntity,
} from '../types/entities';
import { createRestaurantDocument } from './dbInterface';

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
    reviewsByUser: {},
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

    const visitReviewEntity: VisitReviewEntity = {
      date: jsDate,
      comments,
      rating,
    };

    let userReviewsByUser: UserReviewsEntity = null;

    // find the reviews for this user
    // const reviewsByUser: any = (restaurant as any).reviewsByUser;
    const reviewsByUser: any = restaurantEntity.reviewsByUser;
    if (reviewsByUser.hasOwnProperty(userName)) {
      userReviewsByUser = reviewsByUser[userName];
      userReviewsByUser.wouldReturn = wouldReturn;
      userReviewsByUser.visitReviews.push(visitReviewEntity);
    }
    else {
      userReviewsByUser = {
        userName,
        wouldReturn,
        userTags,
        visitReviews: [visitReviewEntity],
      };
    }
    reviewsByUser[userName] = userReviewsByUser;
    restaurant.markModified('reviewsByUser');
    restaurant.save();
    response.json(restaurant);

  });
}

