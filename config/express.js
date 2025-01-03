// O objetivo desse arquivo é configurar o express

const HbsConfigureCustomHelpers = require("./HbsConfigureCustomHelpers");
const express = require("express");
const config = require("config");
const methodOverride = require("method-override");
const app = express();
const webRoutes = require("../routes/web");
const apiRoutes = require("../routes/api");

// Seto a propriedade port dentro do objeto app
app.set("port", process.env.PORT || config.get("server.port"));
// Seto a template engine para renderizar views pelo método res.render
app.set("view engine", "hbs");

// Middleware do Express que é usado para fazer o parsing dos dados enviados pelo cliente através de formulários HTML
app.use(express.urlencoded({ extended: false }));
// Middleware para criar rotas estáticas para todos os arquivos da pasta public
app.use(express.static("./public"));
// Configura os CustomHelpers do pacote hbs
HbsConfigureCustomHelpers.run();
// Configura o method-override no express para poder usar put ou delete nos <form> do HTML
app.use(methodOverride("_method"));
// Middleware - Utilizo um arquivo externo para definir as rotas WEB
app.use(webRoutes);
// Middleware - Utilizo um arquivo externo para definir as rotas API
app.use(apiRoutes);

// exporta o objeto app configurado
module.exports = app;