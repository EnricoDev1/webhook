import express from 'express'
import {setRequest } from '../controllers/dbController.js'

const dbRouter = express.Router()

dbRouter.get('/test', setRequest)


export { dbRouter }