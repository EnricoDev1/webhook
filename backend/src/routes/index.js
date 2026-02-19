import express from 'express';
import { apiRouter } from './api/Api.js';
import { sendHookMessage } from '../controllers/Hook.js';

const router = express.Router();

router.use('/api', apiRouter);
router.all('/:hookId/*splat', sendHookMessage);
router.all('/:hookId', sendHookMessage);

export { router };