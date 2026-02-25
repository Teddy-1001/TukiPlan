import express from 'express'
import {createEvent, createHangout, getAllEvents, getCreateEventPage, getCreateHangoutPage, getEventDetails } from '../controllers/eventController.js'
import isAuthorized from '../middleware/isAuthorized.js'
import upload from '../middleware/multer.js'

const router = express.Router()

router.get("/", getAllEvents)
router.get('/event/:id', getEventDetails)

router.get("/create-hangout",isAuthorized, getCreateHangoutPage)
router.get("/create-event",isAuthorized, getCreateEventPage)


//create an hangout
router.post('/create-hangout',isAuthorized,upload.single("image"), createHangout)
router.post('/create-event',isAuthorized,upload.single("image"), createEvent)




export default router