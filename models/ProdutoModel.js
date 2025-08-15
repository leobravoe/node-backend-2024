// models/ProdutoModel.js
const BaseModel = require("./BaseModel");
// models/BaseModel.js
const DataBase = require("../database/DataBase");

class ProdutoModel extends BaseModel {
    static tableName = "Produto";

    // continua só os métodos com JOIN, se precisar:
    static async findOneWithTipoProdutoDescricao(id) {
        const result = await DataBase.executeSQLQuery(
            `SELECT 
                Produto.*,
                TipoProduto.descricao
            FROM Produto
            JOIN TipoProduto ON Produto.TipoProduto_id = TipoProduto.id
            WHERE Produto.id = ?
            ORDER BY Produto.id`, [id]
        );
        if (result && result.length == 1)
            return result[0];
        return null;
    }

    // continua só os métodos com JOIN, se precisar:
    static async findAllWithTipoProdutoDescricao() {
        const result = await DataBase.executeSQLQuery(
            `SELECT 
                p.*, 
                t.descricao
            FROM Produto p
            JOIN TipoProduto t
            ON p.TipoProduto_id = t.id`
        );
        return result && result.length > 0 ? result : [];
    }
}

module.exports = ProdutoModel;