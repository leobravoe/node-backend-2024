// O objetivo desse arquivo é configurar o express
const express = require("express");
const config = require("config");
const app = express();
// Guardando dentro da variável app uma propriedade
app.set("port", process.env.PORT || config.get("server.port"));
// Request é o que vem do navegador
// Response é o que manda para o navegador
app.get('/', (request, response) => {
    response.send(`
        <html>
            <head>
            </head>
            <body>
                <h1>Olá mundo</h1>
            </body>
        </html>
`);
});
// exporta o objeto app configurado
module.exports = app;