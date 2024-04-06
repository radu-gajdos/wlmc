const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
    // Check if the request contains a valid JWT token
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    // Verify the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authenticateUser;
