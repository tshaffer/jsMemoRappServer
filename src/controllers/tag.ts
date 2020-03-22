import { Request, Response } from 'express';
import { Document } from 'mongoose';
import { TagEntity } from '../types';
import {
  createTagDocument,
} from './dbInterface';

// tag
/*  POST
    {{URL}}/api/v1/tag
    Body
      {
        "value": "taqueria",
      }
*/
export function createTag(request: Request, response: Response, next: any) {
  console.log('createTag');
  console.log(request.body);
  const { value } = request.body;
  const tagEntity: TagEntity = {
    value,
  };
  createTagDocument(tagEntity)
    .then((tagDoc) => {
      const tagDocument = tagDoc as Document;
      console.log('added userDocument');
      console.log(tagDocument);
      console.log(tagDocument.toObject());

      response.status(201).json({
        success: true,
        data: tagDocument,
      });
    });
}
