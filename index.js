const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/sigin", (req, res) => {
    res.send("Sigin");
});

app.get("/signup", (req, res) => {
    res.send("Signup");
});

app.get("/getuser", (req, res) => {
    res.send("getuser");
});

app.listen(port, () => {
    console.info("Aplicação rodando em http://localhost:3000");
});

