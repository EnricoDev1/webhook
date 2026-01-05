import express from 'express';
import { createHook } from '../controllers/Hook.js';

const hookRouter = express.Router();

hookRouter.post("/hookid", createHook);

export { hookRouter };