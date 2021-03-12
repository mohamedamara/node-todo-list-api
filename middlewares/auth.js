const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = authVerification = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ message: "Unauthorized user" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ message: "Unauthorized user" });
  }
};
