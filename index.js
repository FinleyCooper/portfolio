"use strict";


const express = require("express");
require("dotenv").config()

const port = process.env.PORT || 8000;

const app = express();
app.use(express.static("./public"));

app.get("/", (req, res) => {
    res.sendFile("./public/index.html", {root: __dirname});
});

app.listen(port, () => {
    console.log(process.env.NODE_ENV === "production" ? `App Running in Production mode on port ${port}` : `Developer app running at http://localhost:${port}`);
});