import { Document } from 'mongoose';
import User from '../models/User';

import { UserEntity } from '../types/entities';

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

