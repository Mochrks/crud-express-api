const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Get token in autherization

  if (!token) {
    return res.status(401).json({
      status: "error",
      statusCode: 401,
      message: "No token provided",
    });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: "error",
        statusCode: 401,
        message: "Failed to authenticate token",
      });
    }

    req.userId = decoded.id; // save userId to request
    next();
  });
};

module.exports = verifyToken;
