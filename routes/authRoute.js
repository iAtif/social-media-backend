const express = require("express");
const AuthController = require("../controllers/userAuthController");

const router = express.Router();

// User
router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);

module.exports = router;
