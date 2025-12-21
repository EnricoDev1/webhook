import express from 'express';
import dbRouter from './Database.js';
import hookRouter from './Hook.js';

const router = express.Router();

router.use('/db', dbRouter);
router.use('/', hookRouter);

export default router;