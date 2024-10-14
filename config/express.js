// O objetivo desse arquivo é configurar o express
const express = require("express");
const config = require("config");
const app = express();
const webRoutes = require("../routes/web");
const apiRoutes = require("../routes/api");

// Guardando dentro da variável app uma propriedade
app.set("port", process.env.PORT || config.get("server.port"));
// Seto a template engine
app.set("view engine", "hbs");


app.use(express.static("./public"));
// Utilizo um arquivo externo para definir as rotas WEB
app.use(webRoutes);
// Utilizo um arquivo externo para definir as rotas API
app.use(apiRoutes);

// exporta o objeto app configurado
module.exports = app;













// const DataBase = require("./DataBase");

// app.get('/produto', async (request, response) => {
//     const resposta = await DataBase.executeSQLQuery("SELECT * FROM Produto WHERE id = ?", [10]);
//     response.send(resposta);
// });
