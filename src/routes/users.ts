import express from 'express';
const usersRouter = express.Router();

import {
  createUser,
  updateUser,
} from '../controllers';

usersRouter.post('/user', createUser);
usersRouter.patch('/user/:id', updateUser);

export default usersRouter;
