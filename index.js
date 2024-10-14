// O objetivo desse arquivo é ser o arquivo inicial do servidor
const app = require("./config/express");
const port = app.get("port");

app.listen(port, () => {
    console.log(`Servidor rodando. http://127.0.0.1:${port}`);
});