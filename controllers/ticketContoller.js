import connection from "../db/dbConnect.js"
import { generateTicketPDF } from "../utils/pdfGenerator.js"
import { findBookingByCode } from "../services/ticketServices.js"
import crypto from 'crypto'

//book event
export const bookEvent = async (req, res) => {
    const { eventId } = req.params;
    const { tickets_count } = req.body;  // <-- keep this consistent
    const userId = req.session.user.id;

    //  Check event and tickets availability
    connection.query(
        "SELECT tickets_available, title FROM events WHERE id = ?",
        [eventId],
        (err, results) => {
            if (err) return res.status(500).json({ message: "DB error" });
            if (results.length === 0) return res.status(404).json({ message: "Event not found" });

            const event = results[0];
            if (event.tickets_available < tickets_count) {
                return res.status(400).json({ message: "Not enough tickets available" });
            }

            // Generate ticket code
            const ticketCode = crypto.randomBytes(4).toString("hex").toUpperCase();

            // 3 Insert booking
            connection.query(
                "INSERT INTO bookings(event_id, user_id, tickets_count, ticket_code) VALUES(?, ?, ?, ?)",
                [eventId, userId, tickets_count, ticketCode],
                (err, result) => {
                    if (err) return res.status(500).json({ message: "Error creating booking" });

                    // 4 Update tickets_available
                    connection.query(
                        "UPDATE events SET tickets_available = tickets_available - ? WHERE id = ?",
                        [tickets_count, eventId],
                        (err) => {
                            if (err) console.error("Update error:", err);
                        }
                    );

                    //  Return booking details
                    return res.redirect("/my-tickets");
                    
                }
            );
        }
    );
}

//get my tickets
export const getMyTickets = (req, res) => {
    const userId = req.session.user.id

    const query = `
    SELECT b.*, e.title, e.event_date, e.location, e.imagelink
        FROM bookings b
        JOIN events e ON b.event_id = e.id
        WHERE b.user_id = ?
        ORDER BY b.created_at DESC `;
    connection.query(query, [userId], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Server error");
        }
        res.render("my-tickets",{tickets: results})
    })
}

//get ticket pdf
export const getTicketPDF = async(req,res)=>{
    try {
        const {ticketCode} = req.params
        const userId = req.session.user.id

        const booking = await findBookingByCode(ticketCode, userId)
        if(!booking){
            return res.status(404).send("Ticket not found");
        }
        //generate pdf
        generateTicketPDF(res, booking)
    } catch (error) {
        console.error("Controller Error:", error);
        res.status(500).send("Server error");
    }
}

