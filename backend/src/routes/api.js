import express from 'express';
import {dbRouter} from './dbRoutes.js';
import webRoutes from './webRoutes.js';

const router = express.Router();

router.use('/db', dbRouter);
router.use('/', webRoutes);

export default router;