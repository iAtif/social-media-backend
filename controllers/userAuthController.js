const userAuthService = require("../services/userAuthService");

const registerUser = async (req, res) => {
  try {
    const user = req.body;
    const { username, email, password, confirmPassword } = user;

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password does not match",
      });
    }
    const result = await userAuthService.registerUser(user);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: result,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await userAuthService.loginUser(email, password);

    res
      .status(200)
      .json({ success: true, message: "Login Successful", user, token });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
