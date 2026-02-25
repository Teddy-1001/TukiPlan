import connection from "../db/dbConnect.js";

//get all events page>>first page
export const getAllEvents = (req, res) => {
    const allEvents = connection.query("SELECT * FROM events", (err, results) => {
        if (err) {
            console.error("Error fetching events from database", err);
            return res.status(500).json({ message: "Internal Server Error" })
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "No events found" })
        }
        const featuredEvent = results[0] // just an example, replace with your logic
        const events = results.slice(0, 9)
        //const events = await getUpcomingEvents(9); // limit to 9
        res.render('index', {
            title: 'WeekendVibe - Your Weekend Starts Here',
            // user: req.user,
            featuredEvent,
            events,
            searchQuery: req.query.q || "",
            user: req.session.user || null
        });
    });
}

///get event details page
export const getEventDetails = (req, res) => {
    const eventId = req.params.id;

    const eventQuery = "SELECT * FROM events WHERE id =?"
    connection.query(eventQuery, [eventId], (err, result) => {
        if (err) {
            console.error("DB error", err);
            return res.status(500).render("error", { message: "Internal server error" })
        }
        if (result.length === 0) {
            return res.status(404).render("error", { message: "Event not found" })
        }
        const event = result[0]

        res.render("eventDetails.ejs", {
            title: event.title,
            event,
            user: req.session.user || null
        })
    })
}

//get hangout creation page
export const getCreateHangoutPage = (req,res)=>{
    res.render("createHangout", {
        title: "Create Event - WeekendVibe",
        user: req.session.user || null,
        error: null,
        success: null
    })
}

//get hangout creation page
export const getCreateEventPage = (req,res)=>{
    res.render("createEvent.ejs", {
        title: 'TukiPlan · create a weekend vibe',
        user: req.session.user || null,
        error: null,
        success: null
    })
}


//create hangout
export const createHangout = (req, res) => {
    const { title, description, event_date, location, price, tickets_available } = req.body;

    // File field
    const imagePath = req.file ? req.file.path : null;

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const insertEventQuery = `
      INSERT INTO events (title, description, event_date, location, price, tickets_available, imagelink)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(
        insertEventQuery,
        [title, description, event_date, location, price, tickets_available, imagePath],
        (err, results) => {
            if (err) {
                console.error("Error inserting event into database", err);
                return res.status(500).render("error", { message: "Internal Server Error" })
            }

            console.log("Event created successfully with ID:", results.insertId);

            // ✅ Only one response here
            return res.status(201).json({
                message: "Event created successfully",
                eventId: results.insertId
            });
        }
    );
}

//create event

export const createEvent = async (req, res) => {
    const { title, description, event_date, location, price, tickets_available } = req.body

    ///fetch organiser id
    const organizerId = req.session.user.id;

    const imagePath = req.file ? req.file.path : null;

    const insertEventQuery =
        `INSERT INTO events (title, description, event_date, location, price, tickets_available, imagelink, organizer_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    connection.query(insertEventQuery, [title, description, event_date, location, price, tickets_available, imagePath, organizerId], (err, results) => {
        if (err) {
            console.error("Db error", err);
            return res.status(500).render("createEvent", {
                title: 'TukiPlan · create a weekend vibe',
                user: req.session.user,
                error: err.message,
                success: null
            })

        }
        return res.render("createEvent", {
            title: 'TukiPlan · create a weekend vibe',
            user: req.session.user || null,
            success: "Event created successfully!",
            error: null
        })
    })
}

