const express = require("express");
const app = express();
const http = require("http");

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/login", (req, res) => {
    res.send("Login");
})

http.get('http://localhost:3000/controllers/userController', (res) => {
  let data = ''

  res.on('data', (chunk) => {
    data += chunk
  })

  res.on('end', () => {
    console.log(data)
  })
})

app.listen(port, () => {
    console.info("Aplicação rodando em http://localhost:3000");
});

