const mysql2 = require("mysql2/promise");
const config = require("config");
const fs = require("fs").promises;

class DataBase {
    /**
    * Abre uma conexão com o Banco de Dados, realiza uma consulta e depois fecha a conexão.
    * @param {String} sql SQL para ser executado no Banco de Dados.
    * @param {[any, ...any]} params Array de parâmetros que serão substituídos pelos ? na consulta SQL.
    * @return {[Object, ...Object]} Retorna um objeto Array com os objetos encontrados ou o resultado de uma operação (REMOVE, UPDATE), [] caso não encontre nada
    */
    static async executeSQLQuery(sql, params) {
        const connection = await mysql2.createConnection({
            host: config.get("db.host"),
            database: config.get("db.database"),
            user: config.get("db.user"),
            password: config.get("db.password")
        });
        const [rows] = await connection.execute(sql, params);
        connection.end();
        return rows;
    }

    /**
    * Lê um arquivo SQL e executa seu conteúdo no Banco de Dados.
    * @param {String} filePath Caminho do arquivo SQL a ser executado.
    * @return {Promise<void>}
    */
    static async executeSQLFile(filePath) {
        const connection = await mysql2.createConnection({
            host: config.get("db.host"),
            user: config.get("db.user"),
            password: config.get("db.password")
        });

        // Lê o conteúdo do arquivo SQL
        const sql = await fs.readFile(filePath, 'utf8');
        // Divide o SQL em comandos individuais e apaga espaços em branco do início e fim
        const commands = sql.split(';').map(cmd => cmd.trim());

        for (const command of commands) {
            if (command) {
                await connection.query(command);
            }
        }
        console.log('✅ Script SQL executado com sucesso.');
        connection.end();
    }
};

module.exports = DataBase;