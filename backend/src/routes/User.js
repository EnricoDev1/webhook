import express from 'express'
import { getUsers, getUser } from '../controllers/User.js'

const userRouter = express.Router()

userRouter.get('/:id', getUser)
userRouter.get('/', getUsers)

export { userRouter }