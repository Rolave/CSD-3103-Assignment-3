const express = require("express");
const path = require("path");
const userRoutes = require("./routes")

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicDirectoryPath));

userRoutes(app);

module.exports = app;
