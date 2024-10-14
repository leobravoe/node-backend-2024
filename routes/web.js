const express = require("express");
const router = express.Router();
const DataBase = require("../config/DataBase");

router.get("/", (request, response) => {
    response.render("index");
});

router.get("/produto", async (request, response) => {
    // const result = await DataBase.executeSQLQuery("SELECT * FROM Produto");
    response.render("Produto/index");
});

router.get("/tipoproduto", async (request, response) => {
    // const result = await DataBase.executeSQLQuery("SELECT * FROM Produto");
    response.render("TipoProduto/index");
});

module.exports = router;