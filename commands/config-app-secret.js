const Crypto = require("crypto");
const fs = require("fs");
const path = require("path");

// Gera uma chave secreta aleatória de 64 caracteres
const secretKey = Crypto.randomBytes(32).toString("hex");

// Caminho do arquivo de configuração
const configPath = path.join(__dirname, "../config/default.json");

// Verifica se o arquivo existe
if (!fs.existsSync(configPath)) {
    console.error("Arquivo config/default.json não encontrado!");
    process.exit(1);
}

// Lê o arquivo de configuração
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

// Atualiza a chave secreta no arquivo de configuração
config.app = config.app || {};
config.app.secret = secretKey;

// Escreve a configuração de volta no arquivo
fs.writeFileSync(configPath, JSON.stringify(config, null, 4), "utf8");

console.log(`✅ Chave JWT gerada e salva em config/default.json`);