import express from 'express'
import {getRequestbyUser, getUsers, setRequestByUser, setUser} from '../controllers/dbController.js'

const dbRouter = express.Router()

dbRouter.post('/setUser/', setUser)
dbRouter.get('/getUsers/', getUsers)

dbRouter.post('/setRequest/:id', setRequestByUser)
dbRouter.get('/getRequests/:id', getRequestbyUser)

export { dbRouter }