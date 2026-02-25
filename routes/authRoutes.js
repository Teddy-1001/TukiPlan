import express from 'express'
import { getLogin, getRegister, loginUser, registerUser } from '../controllers/authContoller.js'

const router = express.Router()

//login routes
router.get("/login",getLogin)
router.post("/login", loginUser)
router.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Error destroying session:", err);
            return res.status(500).send("Could not log out, please try again.");
        }
        // clear the cookie
        res.clearCookie("connect.sid");
        res.redirect("/");
    });
});
//register routes
router.get("/register", getRegister)
router.post("/register", registerUser)

export default router;