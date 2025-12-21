import express from 'express'
import { setRequestByUser, getRequestByUser, deleteRequestByUser } from '../controllers/requestController.js'

const requestRouter = express.Router()

requestRouter.get('/', getRequestByUser)
requestRouter.post('/', setRequestByUser)
requestRouter.delete('/:id', deleteRequestByUser)

export { requestRouter }
