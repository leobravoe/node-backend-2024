const express = require("express");
const router = express.Router();
const DataBase = require("../config/DataBase");

router.get("/", (request, response) => {
    response.send("Seja bem vindo");
});

router.get("/produto", (request, response) => {
    const result = DataBase.executeSQLQuery("SELECT * FROM Produto");
    response.send(result);
});

module.exports = router;