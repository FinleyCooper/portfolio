"use strict";


const express = require("express");
const rateLimit = require("express-rate-limit");
const fetch = require("node-fetch").default;
require("dotenv").config();

const port = process.env.PORT || 8000;

const app = express();

const apiLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 min limit after 10 requests
    max: 10
});


app.use(express.json());
app.use(express.static("./public"));
app.use("/api/", apiLimiter);

app.get("/", (req, res) => {
    res.sendFile("./public/index.html", {root: __dirname});
});

app.post("/api/contact", (req, res) => {
    const name = getCleanString(req.body.name, 100, "No valid name given");
    const email = getCleanString(req.body.email, 100, "No valid email given");
    const message = getCleanString(req.body.message, 1000, "No valid message given");

    fetch(`https://discord.com/api/webhooks/893393198687338497/${process.env.DISCORD_WEBHOOK_TOKEN}`, {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            content: `Email: ${email}\nMessage: ${message}`,
            username: name,
        }),
        method: "POST"
    })
    .then(resp => res.sendStatus(resp.status))
    .catch(error => {
        res.sendStatus(500);
        console.error(error);
    });

    function getCleanString(text, maxLength, defualtText) {
        return (text && typeof text === "string" && text.length < maxLength) ? text : defualtText;
    }
})

app.listen(port, () => {
    console.log(process.env.NODE_ENV === "production" ? `App Running in Production mode on port ${port}` : `Developer app running at http://localhost:${port}`);
});