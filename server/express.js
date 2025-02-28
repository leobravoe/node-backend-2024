// O objetivo desse arquivo é configurar o express
const HbsConfigureCustomHelpers = require("../hbs_config/HbsConfigureCustomHelpers");
const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session");
const csurf = require('csurf');
const config = require("config");
const webRoutes = require("../routes/web");
const apiRoutes = require("../routes/api");
const app = express();

// Seto a propriedade port dentro do objeto app
app.set("port", process.env.PORT || config.get("server.port"));
// Seto a template engine para renderizar views pelo método res.render
app.set("view engine", "hbs");

// Configura os CustomHelpers do pacote hbs
HbsConfigureCustomHelpers.run();

// Middleware - Usado para criar rotas estáticas para todos os arquivos da pasta public
app.use(express.static("./public"));
// Middleware - Configura o method-override no express para poder usar put ou delete nos <form> do HTML
app.use(methodOverride("_method"));
// Middleware - Usado para fazer o parsing dos dados enviados pelo cliente através de formulários HTML
app.use(express.urlencoded({ extended: false }));
// Middleware - Configura o middeware para fazer o parse no corpo da requisição e identificar dados no formato JSON
app.use(express.json());

// Middleware - Utilizo um arquivo externo para definir as rotas API
app.use(apiRoutes);

// Middleware - Session
app.use(session({
    secret: process.env.SESSION_SECRET || config.get("app.secret"), // chave secreta para assinar o cookie da session com 64 catacteres
    resave: false,
    saveUninitialized: true
}));

// Middleware - Configura o middleware do csrf
app.use(csurf());
// Middleware - Utilizo um arquivo externo para definir as rotas WEB
app.use(webRoutes);

// exporta o objeto app configurado
module.exports = app;
