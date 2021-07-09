const express = require("express");
require("dotenv").config()

const port = process.env.PORT || 8000;

const app = express();
app.use("/static", express.static("public"));

app.get("/", (req, res) => {
    res.sendFile("./public/index.html", {root: __dirname});
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});