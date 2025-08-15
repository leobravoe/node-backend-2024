// models/TipoProdutoModel.js
const BaseModel = require("./BaseModel");

class TipoProdutoModel extends BaseModel {
    static tableName = "TipoProduto";
    // não precisa mais de static columns/insertable/updatable
}

module.exports = TipoProdutoModel;
