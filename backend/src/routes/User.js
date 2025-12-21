import express from 'express'
import { getUsers, setUser, getUser } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post('/', setUser)
userRouter.get('/:id', getUser)
userRouter.get('/', getUsers)

export { userRouter }