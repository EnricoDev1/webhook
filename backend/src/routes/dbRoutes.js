import express from 'express'
import {setRequest, getRequest} from '../controllers/dbController.js'

const dbRouter = express.Router()

dbRouter.get('/set/:id', setRequest)
dbRouter.get('/get/', getRequest)


export { dbRouter }