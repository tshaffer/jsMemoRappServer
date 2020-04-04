import express from 'express';
const usersRouter = express.Router();

import {
  createUser,
  updateUser,
  validateUser,
} from '../controllers';

usersRouter.get('/user/:userName/password/:password', validateUser);
usersRouter.post('/user', createUser);
usersRouter.patch('/user/:id', updateUser);

export default usersRouter;
