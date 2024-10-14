const express = require("express");
const router = express.Router();
const DataBase = require("../config/DataBase");

router.get("/api/produto", (request, response) => {
    const result = DataBase.executeSQLQuery("SELECT * FROM Produto");
    response.send(result);
});

module.exports = router;