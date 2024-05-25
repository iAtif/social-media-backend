const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { SECRET_KEY } = process.env;

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: "Please authenticate: " + error });
  }
};

module.exports = authenticateUser;
