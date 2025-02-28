const DataBase = require("../database/DataBase");

class TipoProdutoModel {
    /** 
     * Os atributos da classe Model precisam ser correspondentes às colunas do banco de dados.
     */
    id = null;
    descricao = null;
    dataAtualizacao = null;
    dataCriacao = null;

    /**
     * Construtor da Classe TipoProdutoModel
     * @param {TipoProduto}     tipoProduto     O objeto de entrada é simples (precisa conter apenas chave e valor, sem métodos) e precisa conter as chaves: id, descricao, dataAtualizacao e dataCriacao. Esses campos são as colunas da tabela no banco de dados. Caso não passe um objeto com esses campos, um model vazio será criado.
     */
    constructor(tipoProduto) {
        if (tipoProduto &&
            "id" in tipoProduto &&
            "descricao" in tipoProduto &&
            "dataAtualizacao" in tipoProduto &&
            "dataCriacao" in tipoProduto
        ) {
            this.id = tipoProduto.id;
            this.descricao = tipoProduto.descricao;
            this.dataAtualizacao = tipoProduto.dataAtualizacao;
            this.dataCriacao = tipoProduto.dataCriacao;
        }
    }

    /**
     * Busca um objeto TipoProdutoModel no banco de dados
     * @param  {Number}               id      ID do tipoProdudo a ser procurado no banco de dados.
     * @return {TipoProdutoModel}             Retorna um objeto TipoProdutoModel com as informações encontradas, caso não encontre, retorna null.
     */
    static async findOne(id) {
        const result = await DataBase.executeSQLQuery(`SELECT * FROM TipoProduto WHERE TipoProduto.id = ?`, [id]);
        if (result && result.length == 1)
            return new TipoProdutoModel(result[0]);
        return null;
    }

    /**
     * Busca todos objetos TipoProdutoModel no banco de dados.
     * @return {[ProdutoModel, ...]} Retorna um array com objetos TipoProdutoModel que contém apenas as informações encontradas, caso não encontre, retorna um array vazio [].
     */
    static async findAll() {
        const result = await DataBase.executeSQLQuery(`SELECT * FROM TipoProduto`);
        if (result && result.length > 0) {
            // Transforma um array de TipoProduto [TipoProduto, ...] em uma array de TipoProdutoModel [TipoProdutoModel, ...]
            const modelArray = result.map(function (obj) {
                obj = new TipoProdutoModel(obj);
                return obj;
            });
            return modelArray;
        }
        return [];
    }

    /**
     * Salva um objeto TipoProdutoModel no banco de dados. O atributo que deve ser informado: "descricao". Os atributos: "id" "dataAtualizacao" e "dataCriacao" são criados automaticamente.
     * @returns {TipoProdutoModel} Retorna um objeto TipoProdutoModel com as informações recém inseridas no banco de dados.
     */
    async save() {
        // Gera um timestamp no formato "YYYY-MM-DD HH:MM:SS" com a data e horário atual
        const timestamp = (new Date()).toISOString().slice(0, 19).replace('T', ' ');
        const result = await DataBase.executeSQLQuery(`INSERT INTO TipoProduto VALUES (null, ?, ?, ?);`,
            [
                this.descricao,
                timestamp,
                timestamp
            ]
        );
        const tipoProduto = await TipoProdutoModel.findOne(result.insertId);
        return tipoProduto;
    }

    /**
     * Atualiza um objeto TipoProdutoModel no banco de dados. O atributo que deve ser informado: "descricao". O atributo: "dataAtualizacao" é atualizado automaticamente. Os atributos: "id" e "dataCriacao" não são alterados.
     * @returns {TipoProdutoModel} Retorna um objeto TipoProdutoModel com as informações atualizadas no banco de dados.
     */
    async update() {
        // Gera um timestamp no formato "YYYY-MM-DD HH:MM:SS" com a data e horário atual
        const timestamp = (new Date()).toISOString().slice(0, 19).replace('T', ' ');
        const result = await DataBase.executeSQLQuery(`UPDATE TipoProduto
                                                       SET descricao = ?,
                                                           dataAtualizacao = ?
                                                       WHERE TipoProduto.id = ?`,
            [
                this.descricao,
                timestamp,
                this.id
            ]
        );
        const tipoProduto = await TipoProdutoModel.findOne(this.id);
        return tipoProduto;
    }

    /**
     * Deleta um objeto TipoProdutoModel no banco de dados.
     * @returns {TipoProdutoModel} Retorna um objeto TipoProdutoModel com as informações removidas banco de dados.
     */
    async delete() {
        const result = await DataBase.executeSQLQuery(`DELETE FROM TipoProduto WHERE TipoProduto.id = ?`, [this.id]);
        return this;
    }
}

module.exports = TipoProdutoModel;
