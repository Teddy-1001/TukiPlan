import express from 'express'
import { bookEvent, getMyTickets, getTicketPDF } from '../controllers/ticketContoller.js'
import isAuthorized from '../middleware/isAuthorized.js'
const router = express.Router()

//book event ticket\
//book event
router.post('/events/:eventId/book',isAuthorized, bookEvent)

//view user ticket
router.get('/my-tickets',isAuthorized, getMyTickets)

//download/view ticket
router.get('/tickets/:ticketCode',isAuthorized, getTicketPDF)

export default router