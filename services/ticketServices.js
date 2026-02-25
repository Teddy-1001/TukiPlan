import connection from "../db/dbConnect.js";

export const findBookingByCode = (ticketCode, userId)=>{
    return new Promise((resolve, reject) => {
        const query = `
        SELECT b.*, e.title, e.event_date, e.location, e.imageLink FROM bookings b JOIN events e ON b.event_id = e.id
            WHERE b.ticket_code = ? AND b.user_id = ? 
        `;
        connection.query(query, [ticketCode, userId], (err,results)=>{
            if(err) return reject(err)
            
            resolve(results.length ? results[0] : null)
        })
    })
}