import express from 'express';
const tagsRouter = express.Router();

import {
  createTag, createTags,
} from '../controllers';

tagsRouter.post('/tag', createTag);
tagsRouter.post('/tags', createTags);

export default tagsRouter;
