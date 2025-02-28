const DataBase = require("../database/DataBase");

class ProdutoModel {
    /** 
     * Os atributos da classe Model precisam ser correspondentes às colunas do banco de dados.
     */
    id = null;
    numero = null;
    nome = null;
    preco = null;
    TipoProduto_id = null;
    ingredientes = null;
    dataAtualizacao = null;
    dataCriacao = null;

    /**
     * Construtor da Classe ProdutoModel
     * @param {Produto}     produto     O objeto de entrada é simples (precisa conter apenas chave e valor, sem métodos) e precisa conter as chaves: id, nome, TipoProduto_id, ingredientes, dataAtualizacao e dataCriacao. Esses campos são as colunas da tabela no banco de dados. Caso não passe um objeto com esses campos, um model vazio será criado.
     */
    constructor(produto) {
        // Verifica se o objeto foi passado por referência e se ele contém os atributos necessários para inicializar o model.
        if (produto &&
            "id" in produto &&
            "numero" in produto &&
            "nome" in produto &&
            "preco" in produto &&
            "TipoProduto_id" in produto &&
            "ingredientes" in produto &&
            "dataAtualizacao" in produto &&
            "dataCriacao" in produto
        ) {
            this.id = produto.id;
            this.numero = produto.numero;
            this.nome = produto.nome;
            this.preco = produto.preco;
            this.TipoProduto_id = produto.TipoProduto_id;
            this.ingredientes = produto.ingredientes;
            this.dataAtualizacao = produto.dataAtualizacao;
            this.dataCriacao = produto.dataCriacao;
        }
    }

    /**
     * Busca um objeto ProdutoModel no banco de dados
     * @param  {Number}         id      ID do produto a ser procurado no banco de dados.
     * @return {ProdutoModel}           Retorna um objeto ProdutoModel com as informações encontradas, caso não encontre, retorna null.
     */
    static async findOne(id) {
        const result = await DataBase.executeSQLQuery(`SELECT * FROM Produto WHERE Produto.id = ?`, [id]);
        if (result && result.length == 1)
            return new ProdutoModel(result[0]);
        return null;
    }

    /**
     * Busca um objeto simples Produto no banco de dados, adicionando ao resultado a coluna "descricao" da tabela "TipoProduto".
     * @param  {Number}     id     ID do produto a ser procurado no banco de dados.
     * @return {Produto}           Retorna um objeto simples Produto com as informações encontradas, adicionando ao resultado a coluna "descricao" da tabela "TipoProduto", caso não encontre, retorna null.
     */
    static async findOneWithTipoProdutoDescricao(id) {
        const result = await DataBase.executeSQLQuery(`SELECT Produto.*,
                                                              TipoProduto.descricao
                                                           FROM Produto
                                                           JOIN TipoProduto ON Produto.TipoProduto_id = TipoProduto.id
                                                           WHERE Produto.id = ?
                                                           ORDER BY Produto.id`, [id]);
        if (result && result.length == 1)
            return result[0];
        return null;
    }

    /**
     * Busca todos objetos ProdutoModel no banco de dados.
     * @return {[ProdutoModel, ...]} Retorna um array com objetos ProdutoModel que contém apenas as informações encontradas, caso não encontre, retorna um array vazio [].
     */
    static async findAll() {
        const result = await DataBase.executeSQLQuery(`SELECT * FROM Produto`);
        if (result && result.length > 0) {
            // Transforma um array de Produto [Produto, ...] em uma array de ProdutoModel [ProdutoModel, ...]
            const modelArray = result.map(function (obj) {
                obj = new ProdutoModel(obj);
                return obj;
            });
            return modelArray;
        }
        return [];
    }

    /**
     * Busca todos objetos simples Produto no banco de dados, adicionando ao resultado a coluna "descricao" da tabela "TipoProduto".
     * @return {[Produto, ...]} Retorna um array de objetos simples Produto com as informações encontradas, adicionando ao resultado a coluna "descricao" da tabela "TipoProduto", caso não encontre, retorna um vetor vazio [].
     */
    static async findAllWithTipoProdutoDescricao() {
        const result = await DataBase.executeSQLQuery(`SELECT Produto.*,
                                                              TipoProduto.descricao as TipoProduto_descricao
                                                       FROM Produto
                                                       JOIN TipoProduto ON Produto.TipoProduto_id = TipoProduto.id
                                                       ORDER BY Produto.id`);
        if (result && result.length > 0)
            return result;
        return [];
    }

    /**
     * Salva um objeto ProdutoModel no banco de dados. Os atributos que devem ser informados: "nome", "preco", "TipoProduto_id" e "ingredientes". Os atributos: "id" "dataAtualizacao" e "dataCriacao" são criados automaticamente.
     * @returns {ProdutoModel} Retorna um objeto ProdutoModel com as informações recém inseridas no banco de dados.
     */
    async save() {
        // Gera um timestamp no formato "YYYY-MM-DD HH:MM:SS" com a data e horário atual
        const timestamp = (new Date()).toISOString().slice(0, 19).replace('T', ' ');
        const result = await DataBase.executeSQLQuery(`INSERT INTO Produto VALUES (null, ?, ?, ?, ?, ?, ?, ?);`,
            [
                this.numero,
                this.nome,
                this.preco,
                this.TipoProduto_id,
                this.ingredientes,
                timestamp,
                timestamp
            ]
        );
        const produto = await ProdutoModel.findOne(result.insertId);
        return produto;
    }

    /**
     * Atualiza um objeto ProdutoModel no banco de dados. Os atributos que devem ser informados: "nome", "preco", "TipoProduto_id" e "ingredientes". O atributo: "dataAtualizacao" é atualizado automaticamente. Os atributos: "id" e "dataCriacao" não são alterados.
     * @returns {ProdutoModel} Retorna um objeto ProdutoModel com as informações atualizadas no banco de dados.
     */
    async update() {
        // Gera um timestamp no formato "YYYY-MM-DD HH:MM:SS" com a data e horário atual
        const timestamp = (new Date()).toISOString().slice(0, 19).replace('T', ' ');
        const result = await DataBase.executeSQLQuery(`UPDATE Produto
                                                       SET numero = ?,
                                                           nome = ?,
                                                           preco = ?,
                                                           TipoProduto_id = ?,
                                                           ingredientes = ?,
                                                           dataAtualizacao = ?
                                                       WHERE Produto.id = ?`,
            [
                this.numero,
                this.nome,
                this.preco,
                this.TipoProduto_id,
                this.ingredientes,
                timestamp,
                this.id,
            ]
        );
        const produto = await ProdutoModel.findOne(this.id);
        return produto;
    }

    /**
     * Deleta um objeto ProdutoModel no banco de dados.
     * @returns {ProdutoModel} Retorna um objeto ProdutoModel com as informações removidas banco de dados.
     */
    async delete() {
        const result = await DataBase.executeSQLQuery(`DELETE FROM Produto WHERE Produto.id = ?`, [this.id]);
        return this;
    }
}

module.exports = ProdutoModel;
