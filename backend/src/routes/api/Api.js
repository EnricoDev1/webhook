import express from 'express';
import { dbRouter } from './Database.js';
import { hookRouter } from './Hook.js';

const apiRouter = express.Router();

apiRouter.use('/db', dbRouter);
apiRouter.use('/', hookRouter);


export { apiRouter };