// server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3300;

// If you want EJS templates
import ejs from "ejs";
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());

// Route for plain text
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Route for rendering an EJS view
app.get("/index", (req, res) => {
    //const featuredEvent =  getFeaturedEvent(); // your DB query
    const allEvents =
        [
            {
                "id": 1,
                "title": "Sunset Picnic & Live Acoustic Vibes",
                "description": "Chill afternoon picnic at Uhuru Park with live guitar, good food, board games, and sunset views. Bring your blanket and friends — perfect for couples, families, or solo vibes. Food vendors on site, non-alcoholic drinks provided.",
                "date": "2026-02-14T16:00:00",
                "location": "Uhuru Park, Nairobi",
                "price": 450.00,
                "tickets_available": 85,
                "organizer": "organizer1"
            },
            {
                "id": 2,
                "title": "Nyama Choma & Games Night – Westlands Edition",
                "description": "All-you-can-eat nyama choma, Tusker, mocktails, music, and fun group games (sack race, tug-of-war, trivia). Great for chamas, work crews, or birthday squads. Limited spots!",
                "date": "2026-02-15T14:00:00",
                "location": "Karura Forest Picnic Area, Nairobi",
                "price": 1200.00,
                "tickets_available": 120,
                "organizer": "nyamachomaking"
            },
            {
                "id": 3,
                "title": "Rooftop House Party – Sky Lounge",
                "description": "House + Afrobeats + Amapiano all night. Free entry before 9 PM with ticket, dress code smart casual. Photo booth, mocktails & cocktails available. 21+ only.",
                "date": "2026-02-21T20:00:00",
                "location": "Sky Lounge, Westlands, Nairobi",
                "price": 800.00,
                "tickets_available": 60,
                "organizer": "rooftopvibes"
            },
            {
                "id": 4,
                "title": "Community Movie Night under the Stars",
                "description": "Free outdoor screening of a classic Kenyan comedy + popcorn giveaway. Bring your own mat/chair. Family-friendly, all ages welcome.",
                "date": "2026-02-22T18:30:00",
                "location": "Junction Mall Open Grounds, Ngong Road",
                "price": 0.00,
                "tickets_available": 200,
                "organizer": "organizer1"
            },
            {
                "id": 5,
                "title": "Weekend Kickabout – 5-a-side Football Tournament",
                "description": "Friendly 5-a-side football tourney with prizes for winners. Teams of 5–7 players. Registration includes bibs, ref, and small trophies. Open to all skill levels.",
                "date": "2026-02-28T09:00:00",
                "location": "Jamhuri Park Grounds, Nairobi",
                "price": 1500.00,
                "tickets_available": 18,
                "organizer": "jamhurifc"
            },
            {
                "id": 6,
                "title": "Chill Board Games & Coffee Hangout",
                "description": "Relaxed afternoon of board games, unlimited coffee/tea, and light snacks at a cozy cafe. Great for introverts, new friends, or just unwinding. Bring your favorite game!",
                "date": "2026-03-01T15:00:00",
                "location": "Artcaffe, The Hub, Karen",
                "price": 350.00,
                "tickets_available": 40,
                "organizer": "gamevibes254"
            }
        ]

        const featuredEvent = allEvents[0] // just an example, replace with your logic

    
    const events = allEvents.slice(0,9)
    {
        //const events = await getUpcomingEvents(9); // limit to 9
        res.render('index', {
            title: 'WeekendVibe - Your Weekend Starts Here',
            // user: req.user,
            featuredEvent,
            events,
            searchQuery: req.query.q || "",
            user: null
        });
    }})

    app.get("/login", (req,res)=>{
        res.render("login", {
            title: "Login - WeekendVibe",
        })
    })

    app.get("/register", (req,res)=>{
        res.render("signup", {
            title: "Register - WeekendVibe",
        })
    })

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});