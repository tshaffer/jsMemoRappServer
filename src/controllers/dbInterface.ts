import { Document } from 'mongoose';
import Tag from '../models/Tag';
import User from '../models/User';

import { UserEntity, TagEntity, RestaurantEntity, RestaurantReviewEntity } from '../types/entities';
import Restaurant from '../models/Restaurant';

export const createUserDocuments = (userDocuments: UserEntity[]): Promise<Document[]> => {
  return new Promise((resolve: any, reject: any) => {
    User.collection.insert(userDocuments, (err, docs) => {
      if (err) {
        console.log(err);
        if (err.code === 11000) {
          console.log('createUserDocuments: duplicate key error');
          resolve([]);
        } else {
          reject(err);
        }
      }
      else {
        console.log(docs);
        resolve(docs);
      }
    });
  });
};

export const createUserDocument = (userEntity: UserEntity): Promise<any> => {
  return User.create(userEntity)
    .then((user: Document) => {
      return Promise.resolve(user);
    });
};

export const createTagDocuments = (tagDocuments: TagEntity[]): Promise<Document[]> => {
  return new Promise((resolve: any, reject: any) => {
    Tag.collection.insert(tagDocuments, (err, docs) => {
      if (err) {
        console.log(err);
        if (err.code === 11000) {
          console.log('createTagDocuments: duplicate key error');
          resolve([]);
        } else {
          reject(err);
        }
      }
      else {
        console.log(docs);
        resolve(docs);
      }
    });
  });
};

export const createTagDocument = (tagEntity: TagEntity): Promise<any> => {
  return Tag.create(tagEntity)
    .then((tag: Document) => {
      return Promise.resolve(tag);
    });
};

export function getTagsFromDb(): Promise<TagEntity[]> {
  const query = Tag.find({});
  const promise: Promise<Document[]> = query.exec();
  return promise.then((tagDocuments: Document[]) => {
    const tagEntities: TagEntity[] = tagDocuments.map((tagDocument: any) => {
      return tagDocument.toObject();
    });
    return Promise.resolve(tagEntities);
  });
}


export const createRestaurantDocument = (restaurantEntity: RestaurantEntity): Promise<any> => {
  return Restaurant.create(restaurantEntity)
    .then((restaurant: Document) => {
      return Promise.resolve(restaurant);
    });
};

export const createRestaurantDocuments = (restaurantDocuments: RestaurantEntity[]): Promise<Document[]> => {
  return new Promise((resolve: any, reject: any) => {
    Restaurant.collection.insert(restaurantDocuments, (err, docs) => {
      if (err) {
        console.log(err);
        if (err.code === 11000) {
          console.log('createRestaurantDocuments: duplicate key error');
          resolve([]);
        } else {
          reject(err);
        }
      }
      else {
        console.log(docs);
        resolve(docs);
      }
    });
  });
};

export const createRestaurantReviewDocuments = (yelpId: string, reviews: RestaurantReviewEntity[]): Promise<Document> => {
  
  const query = Restaurant.findOneAndUpdate(
    { 'yelpBusinessDetails.id': yelpId },
    { reviews },
  );
  
  const promise: Promise<Document> = query.exec();
  return promise
    .then((restaurant: Document) => {
      return Promise.resolve(restaurant);
    }).catch( (err: any) => {
      console.log(err);
      debugger;
      return Promise.reject(err);
    });
};
