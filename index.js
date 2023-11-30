const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    router.get('/user', authMiddleware, userController.getUser);
});

app.listen(port, () => {
    console.info("Aplicação rodando em http://localhost:3000");
});

