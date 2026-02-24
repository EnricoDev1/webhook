import express from 'express';
import { requestRouter } from './Request.js';

const dbRouter = express.Router();

dbRouter.use('/request', requestRouter);

export { dbRouter };