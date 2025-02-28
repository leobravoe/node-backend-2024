// O objetivo desse arquivo é ser o arquivo inicial do servidor

const app = require("./server/express");
const port = app.get("port");

app.listen(port, () => {
    console.log(`Servidor backend rodando. http://127.0.0.1:${port}`);
});