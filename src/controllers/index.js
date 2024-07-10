const path = require("path");
const fs = require("fs");

const dbPath = path.join(__dirname, "../db/myDB.txt");
const ALERT_TYPE_DANGER = "danger";
const ALERT_TYPE_SUCCESS = "success";
const INTERNAL_SERVER_ERROR_MESSAGE = "Internal Server Error"

const createUser = (req, res) => {
  const { username, password } = req.body || {};

  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading database", err);
      return res.status(500).json({ alertType: ALERT_TYPE_DANGER, message: INTERNAL_SERVER_ERROR_MESSAGE });
    }

    const users = data.split("\n").filter(Boolean);
    const userExists = users.some(
      (user) => user.split(",")[0].toLowerCase() === username.toLowerCase()
    );

    if (userExists) {
      return res.status(400).json({ alertType: ALERT_TYPE_DANGER, message: "User already exists" });
    }

    const newUser = `${username},${password}\n`;

    fs.appendFile(dbPath, newUser, (err) => {
      if (err) {
        return res.status(500).json({ alertType: ALERT_TYPE_DANGER, message: INTERNAL_SERVER_ERROR_MESSAGE });
      }
      res.status(201).json({ alertType: ALERT_TYPE_SUCCESS, message: "User created successfully" });
    });
  });
};

const authenticateUser = (req, res) => {
  const { username, password } = req.body || {};
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading database", err);
      return res
        .status(500)
        .json({
          alertType: ALERT_TYPE_DANGER,
          message: INTERNAL_SERVER_ERROR_MESSAGE,
        });
    }

    const users = data.split("\n").filter(Boolean);
    const validUser = users.find((user) => {
      const [storedUsername, storedPassword] = user.split(",");
      return (
        storedUsername &&
        storedUsername.toLowerCase() === username.toLowerCase() &&
        storedPassword &&
        storedPassword === password
      );
    });

    if (validUser) {
      res
        .status(200)
        .json({ alertType: ALERT_TYPE_SUCCESS, message: "Login successful" });
    } else {
      res
        .status(401)
        .json({
          alertType: ALERT_TYPE_DANGER,
          message: "Invalid username or password",
        });
    }
  });
};

const getUnknonRoute = (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../../public/404.html"));
};

module.exports = {
  createUser,
  authenticateUser,
  getUnknonRoute,
};
