const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/login", (req, res) => {
    res.send("Login");
})

app.listen(port, () => {
    console.info("Aplicação rodando em http://localhost:3000");
});

