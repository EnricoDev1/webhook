import express from 'express';
import {userRouter} from './User.js';
import {requestRouter} from './Request.js';

const dbRouter = express.Router();

dbRouter.use('/user', userRouter);
dbRouter.use('/request', requestRouter);

export default dbRouter;