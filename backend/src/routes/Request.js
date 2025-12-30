import express from 'express'
import { getRequestByUser, deleteRequestByUser } from '../controllers/requestController.js'
import { requireAuth } from '../middlewares/AuthMiddleware.js'

const requestRouter = express.Router()

requestRouter.get('/', requireAuth, getRequestByUser)
requestRouter.delete('/:id', requireAuth, deleteRequestByUser)

export { requestRouter }
