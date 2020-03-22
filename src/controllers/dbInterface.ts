import { Document } from 'mongoose';
import Tag from '../models/Tag';
import User from '../models/User';

import { UserEntity, TagEntity } from '../types/entities';

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

