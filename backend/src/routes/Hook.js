import express from 'express';
import { createHook } from '../controllers/hookController.js';

const hookRouter = express.Router();

hookRouter.post("/hookid", createHook);

export default hookRouter;