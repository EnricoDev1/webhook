import express from 'express'
import {getRequestByUser, deleteRequestByUser } from '../controllers/requestController.js'

const requestRouter = express.Router()

requestRouter.get('/', getRequestByUser)
requestRouter.delete('/:id', deleteRequestByUser)

export { requestRouter }
