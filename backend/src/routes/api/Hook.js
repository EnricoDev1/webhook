import express from 'express';
import { createHook, createPage, getPage } from '../../controllers/Hook.js';
import { requireAuth } from '../../middlewares/Auth.js';

const hookRouter = express.Router();

hookRouter.post("/hookid", createHook);
hookRouter.post("/page", requireAuth, createPage);
hookRouter.get("/page", requireAuth, getPage);

hookRouter.use((req, res) => {
  res.status(404).json({ error: 'Root not found' });
});
export { hookRouter };