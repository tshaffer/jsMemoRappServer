import express from 'express';
const tagsRouter = express.Router();

import {
  createTag,
} from '../controllers';

tagsRouter.post('/tag', createTag);

export default tagsRouter;
