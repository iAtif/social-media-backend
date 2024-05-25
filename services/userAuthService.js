const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { SECRET_KEY } = process.env;

const registerUser = async (user) => {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    const newUser = await User.create(user);

    return newUser;
  } catch (error) {
    throw new Error("Failed to Register: " + error.message);
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("No User found.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid Email or Password");
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    return {
      user: {
        userId: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    };
  } catch (error) {
    throw new Error("Failed to Login: " + error.message);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
