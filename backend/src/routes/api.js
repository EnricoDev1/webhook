import express from 'express';
import dbRoutes from './dbRoutes.js';
import webRoutes from './webRoutes.js';

const router = express.Router();

router.use('/db', dbRoutes);
router.use('/', webRoutes);

export default router;