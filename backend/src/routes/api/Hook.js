import express from 'express';
import { createHook, createPage } from '../../controllers/Hook.js';
import { requireAuth } from '../../middlewares/Auth.js';

const hookRouter = express.Router();

hookRouter.post("/hookid", createHook);
hookRouter.post("/page", requireAuth, createPage);
export { hookRouter };