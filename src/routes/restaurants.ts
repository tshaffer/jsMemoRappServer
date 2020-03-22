import express from 'express';
import { 
  createRestaurant,
  updateRestaurant,
} from '../controllers/restaurant';

const restaurantsRouter = express.Router();

restaurantsRouter.post('/restaurant', createRestaurant);
restaurantsRouter.patch('/restaurant/:id', updateRestaurant);

export default restaurantsRouter;
