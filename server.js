// server.js
import express from "express";
import path from "path";
import bcrypt from "bcrypt";
import session from "express-session";
import { fileURLToPath } from "url";
import connection from "./db/dbConnect.js";
import { configDotenv } from "dotenv";
configDotenv();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3300;

// If you want EJS templates
import ejs from "ejs";
import upload from "./middleware/multer.js";
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))


// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

//route to upload files using multer
app.post("/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" })
    }
    res.status(200).json({ message: "File uploaded successfully", filePath: req.file.path })

    //save file path to database if needed
    const sql = "INSERT INTO events (imagelink) VALUES(?)";
    connection.query(sql, [req.file.path], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error saving file path to database" })
        }
        if (results) {
            console.log("File path saved to database successfully");
        }
    })
})




// Route for rendering an EJS view
app.get("/", (req, res) => {
    //const featuredEvent =  getFeaturedEvent(); // your DB query
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
            user: null
        });
    });




    {
        
    }
})

app.get("/login", (req, res) => {
    res.render("login", {
        title: "Login - WeekendVibe",
    })
})

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    connection.query("SELECT * FROM users WHERE email = ?", [email], async (querryErr, results) => {
        if (querryErr) {
            console.error("DB Query error", querryErr);
            res.status(500).json({ message: "Internal Server Error" })
        }
        if (results.length === 0) {
            // No user found with that email
            return res.status(401).send("Invalid email or password")
        }
        const user = results[0];

        //compare password with hashed
        bcrypt.compare(password, user.hashedPassword, (bcryptError, isMatch) => {
            if (bcryptError) {
                console.error("Error comparing passwords", bcryptError);
                return res.status(500).send("Internal Server Error")
            }
            if (isMatch) {
                // Passwords match, login successful
                console.log("Login successful for user:", user.email);
                // Here you would typically create a session or JWT token
                console.log("Login successful");

                //create session
                req.session.user = results[0]

                res.redirect("/dashboard")
            } else {
                // Passwords do not match
                console.log("Login failed for user:", user.email);
                res.status(401).send("Invalid email or password")
            }
        })
    })
})

app.get("/register", (req, res) => {
    res.render("signup", {
        title: "Register - WeekendVibe",
    })
})
app.post("/register", async (req, res) => {
    // Handle user registration logic here
    try {
        const { fullname, email, password } = req.body;

        //hashing password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        //insert user into database
        const insertStatement = `INSERT INTO users(fullname,email, hashedPassword) VALUES (?, ?, ?)`;
        connection.query(insertStatement, [fullname, email, hashedPassword], (querryErr, results) => {
            if (querryErr) {
                console.error("DB Insert error", querryErr);
                res.status(500).json({ message: "Internal Server Error" })
            }
            if (results) {
                // res.status(201).json({message: "User registered successfully"})
                console.log("User registered successfully");

                res.redirect("/login")
            }
        })
    } catch (error) {
        console.error("Registration error", error);
        res.status(500).json({ message: "Internal Server Error" })

    }
})


//create an event
app.get("/create", (req,res)=>{
res.render("createEvent", {
    title: "Create Event - WeekendVibe",
    user: null,
    error: null,
    success: null
}) })


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});