const isAuthorized = (req, res, next) => {
    // check if session exists and user is logged in
    if (req.session?.user) {
        return next();
    }

    // store intended route for redirect after login
    req.session.returnTo = req.originalUrl;

    // handle API vs page requests
    if (req.headers.accept && req.headers.accept.includes("application/json")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    return res.status(401).render("notAuth", {
        title: "Unauthorized - WeekendVibe",
        user: null
    });
};

export default isAuthorized;