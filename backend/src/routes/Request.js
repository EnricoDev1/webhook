import express from 'express'
import { getRequestByUser, deleteRequestByUser, deleteAllRequestByUser } from '../controllers/Request.js'
import { requireAuth } from '../middlewares/Auth.js'

const requestRouter = express.Router()

requestRouter.get('/', requireAuth, getRequestByUser)
requestRouter.delete('/:id', requireAuth, deleteRequestByUser)
requestRouter.delete('/', requireAuth, deleteAllRequestByUser)

export { requestRouter }
