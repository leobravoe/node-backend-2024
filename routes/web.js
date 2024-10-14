const express = require("express");
const router = express.Router();
const DataBase = require("../config/DataBase");

router.get("/", (request, response) => {
    response.send("Seja bem vindo");
});

router.get("/produto", async (request, response) => {
    // const result = await DataBase.executeSQLQuery("SELECT * FROM Produto");
    response.render("Produto/index");
});

module.exports = router;