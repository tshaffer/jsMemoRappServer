import express from 'express';
const tagsRouter = express.Router();

import {
  createTag, createTags, getTags,
} from '../controllers';

tagsRouter.get('/tags', getTags);

tagsRouter.post('/tag', createTag);
tagsRouter.post('/tags', createTags);

export default tagsRouter;
