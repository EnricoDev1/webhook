import express from 'express';
import { createHook, sendHookMessage } from '../controllers/hookController.js';

const hookRouter = express.Router();

hookRouter.post("/hookid", createHook);

export default hookRouter;