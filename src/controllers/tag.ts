import { Request, Response } from 'express';
import { Document } from 'mongoose';
import {
  createTagDocument, createTagDocuments, getTagsFromDb,
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
  const tag: string = value;
  
  createTagDocument(tag)
    .then((tagDoc) => {
      const tagDocument = tagDoc as Document;
      console.log('added tagDocument');
      console.log(tagDocument);
      console.log(tagDocument.toObject());

      response.status(201).json({
        success: true,
        data: tagDocument,
      });
    });
}

export function createTags(request: Request, response: Response, next: any) {
  console.log('createTags');
  console.log(request.body);
  const tags: string[] = request.body.values.map((tagValue: string) => {
    return tagValue;
  });

  createTagDocuments(tags)
    .then((tagDocs) => {
      const tagDocuments = tagDocs as Document[];
      console.log('added tagDocuments');
      console.log(tagDocuments);

      response.status(201).json({
        success: true,
        data: tagDocuments,
      });
    });
}

/*
    GET
    {{URL}}/api/v1/tags
*/
export function getTags(request: Request, response: Response, next: any) {
  return getTagsFromDb().then((responseData: any) => {
    response.json(responseData);
  });
}
