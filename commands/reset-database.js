const DataBase = require('../database/DataBase');

(async () => {
    try {
        await DataBase.executeSQLFile('database/sqlbanco.sql');
    } catch (error) {
        console.error('Erro ao executar o arquivo SQL:', error);
    }
})();