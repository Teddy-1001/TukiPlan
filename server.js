// server.js
import express from "express";
import path from "path";
import crypto from "crypto"; // for generating unique ticket codes
import session from "express-session";
import { fileURLToPath } from "url";
import connection from "./db/dbConnect.js";
import authRoutes from './routes/authRoutes.js'
import eventRoutes from './routes/eventRoutes.js'
import ticketRoutes from './routes/ticketRoutes.js'
import { configDotenv } from "dotenv";
import PDFDocument from "pdfkit";
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
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }
}))


// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

app.use("/", authRoutes);
app.use('/',eventRoutes )
app.use('/', ticketRoutes)


//route to upload files using multer
app.post("/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" })
    }


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
    res.status(200).json({ message: "File uploaded successfully", filePath: req.file.path })
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});