import bcrypt from "bcrypt"
import connection from "../db/dbConnect.js"

//get login page

export const getLogin=(req,res)=>{
    res.render("login", {
        title: "Login - WeekendVibe",
    })
}

//post login
export const loginUser = (req,res)=>{
    const { email, password } = req.body;

    connection.query("SELECT * FROM users WHERE email = ?", [email], async (querryErr, results) => {
        if (querryErr) {
            console.error("DB Query error", querryErr);
            return res.status(500).json({ message: "Internal Server Error" })
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
            if (!isMatch) {
                // Passwords do not match
                console.log("Login failed for user:", user.email);
                return res.status(401).send("Invalid email or password")
            }
            // Passwords match, login successful
            console.log("Login successful for user:", user.email);

            //create session
            req.session.user = results[0]

            //redirect to original url or homepage
            const redirectTo = req.session.returnTo || "/";
            delete req.session.returnTo; // clear it after redirecting

            return res.redirect(redirectTo);
        })
    })
}

//get register page
export const getRegister = (req,res)=>{
    res.render("signup", {
        title: "Register - WeekendVibe",
    })
}


///post in register
export const registerUser = async(req,res)=>{
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
                return res.status(500).json({ message: "Internal Server Error" })
            }
            if (results) {
                console.log("User registered successfully");
                return res.redirect("/login")
            }
        })
    } catch (error) {
        console.error("Registration error", error);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}