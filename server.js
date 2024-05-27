const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const { PORT } = process.env || 5000;
const db = require("./config/database");

const authRoute = require("./routes/authRoute");
const postRoute = require("./routes/postRoute");

db.connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public/images"));

// Define the root route
app.get("/", (req, res) => {
  res.send("Welcome to the backend API");
});

// Use the authentication routes
app.use("/auth", authRoute);
app.use("/post", postRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
