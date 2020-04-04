import { Request, Response } from 'express';
import User from '../models/User';
import { Document } from 'mongoose';

import { UserEntity } from '../types';
import {
  createUserDocument, getUser,
} from './dbInterface';

// users
/*  POST
    {{URL}}/api/v1/user
    Body
      {
        "name": "Ted",
        "password": "letMeIn"
        "email": "ted@pizza.com"
      }
*/
export function createUser(request: Request, response: Response, next: any) {
  console.log('createUser');
  console.log(request.body);
  const { userName, password, email } = request.body;
  const userEntity: UserEntity = {
    userName,
    password,
    email,
  };
  createUserDocument(userEntity)
    .then((userDoc) => {
      const userDocument = userDoc as Document;
      console.log('added userDocument');
      console.log(userDocument);
      console.log(userDocument.toObject());

      response.status(201).json({
        success: true,
        data: userDocument,
      });
    });
}

/*  PATCH
    {{URL}}/api/v1/user/<userId>
    Body
    {
    	"password": "letMeIn69"
    }
*/
export function updateUser(request: Request, response: Response, next: any) {
  console.log('updateUser');
  console.log(request.body);

  User.findById(request.params.id, (err, user) => {
    if (request.body._id) {
      delete request.body._id;
    }
    for (const b in request.body) {
      if (request.body.hasOwnProperty(b)) {
        (user as any)[b] = request.body[b];
      }
    }
    user.save();
    response.json(user);
  });
}

/*
    GET
    {{URL}}/api/v1/validateUser
      userName and password in the body
*/
export function validateUser(request: Request, response: Response, next: any) {
  const { userName, password } = request.params;
  return getUser(userName, password)
    .then((responseData: any) => {
      response.json(responseData);
    }).catch((err: Error) => {
      response.json(null);
    });
}
