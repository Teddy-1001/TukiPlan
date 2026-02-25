import express from "express";
import connection from "../db/dbConnect.js";
import { generateTicketPDF } from "../services/pdfService.js";
import isAuthorized from "../middleware/isAuthorized.js";

const router = express.Router();

// GET ticket PDF
router.get("/tickets/:ticketCode", (req, res) => {
    const { ticketCode } = req.params;
    const userId = req.session.user.id;

    const query = `
        SELECT b.*, e.title, e.event_date, e.location
        FROM bookings b
        JOIN events e ON b.event_id = e.id
        WHERE b.ticket_code = ? AND b.user_id = ?
    `;

    connection.query(query, [ticketCode, userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Database error");
        }

        if (results.length === 0) {
            return res.status(404).send("Ticket not found");
        }

        const booking = results[0];

        // 👉 generate PDF
        generateTicketPDF(res, booking);
    });
});

export default router;