import express from 'express'
import { getUsers, getUser } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.get('/:id', getUser)
userRouter.get('/', getUsers)

export { userRouter }