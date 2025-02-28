const DataBase = require("../database/DataBase");

class PedidoModel {
    /** 
     * Os atributos da classe Model precisam ser correspondentes às colunas do banco de dados.
     */
    id = null;
    Mesa_id = null;
    estado = null;
    dataAtualizacao = null;
    dataCriacao = null;

    /**
     * Construtor da Classe PedidoModel
     * @param {Pedido}      pedido      O objeto de entrada é simples (precisa conter apenas chave e valor, sem métodos) e precisa conter as chaves: id, Mesa_id, estado, dataAtualizacao e dataCriacao. Esses campos são as colunas da tabela no banco de dados. Caso não passe um objeto com esses campos, um model vazio será criado.
     */
    constructor(pedido) {
        if (pedido &&
            "id" in pedido &&
            "Mesa_id" in pedido &&
            "estado" in pedido &&
            "dataAtualizacao" in pedido &&
            "dataCriacao" in pedido
        ) {
            this.id = pedido.id;
            this.Mesa_id = pedido.Mesa_id;
            this.estado = pedido.estado;
            this.dataAtualizacao = pedido.dataAtualizacao;
            this.dataCriacao = pedido.dataCriacao;
        }
    }

    /**
     * Busca um objeto PedidoModel no banco de dados
     * @param  {Number}         id        ID do pedido a ser procurado no banco de dados.
     * @return {PedidoModel}              Retorna um objeto PedidoModel com as informações encontradas, caso não encontre, retorna null.
     */
    static async findOne(id) {
        const result = await DataBase.executeSQLQuery(`SELECT * FROM Pedido WHERE Pedido.id = ?`, [id]);
        if (result && result.length > 0)
            return new PedidoModel(result[0]);
        return null;
    }

    /**
     * Busca todos objetos PedidoModel no banco de dados.
     * @return {[PedidoModel, ...]} Retorna um array com objetos PedidoModel que contém apenas as informações encontradas, caso não encontre, retorna um array vazio [].
     */
    static async findAll() {
        const result = await DataBase.executeSQLQuery(`SELECT * FROM Pedido`);
        if (result && result.length > 0) {
            // Transforma um array de Pedidos [Pedido, ...] em uma array de PedidoModel [PedidoModel, ...]
            const modelArray = result.map(function (obj) {
                obj = new PedidoModel(obj);
                return obj;
            });
            return modelArray;
        }
        return [];
    }

    /**
     * Busca todos objetos PedidoModel no banco de dados.
     * @return {[PedidoModel, ...]} Retorna um array com objetos PedidoModel que contém apenas as informações encontradas, caso não encontre, retorna um array vazio [].
     */
    static async findByMesaId(mesaId) {
        const result = await DataBase.executeSQLQuery(`SELECT * FROM Pedido WHERE Pedido.Mesa_id = ?`, [mesaId]);
        if (result && result.length > 0) {
            // Transforma um array de Pedidos [Pedido, ...] em uma array de PedidoModel [PedidoModel, ...]
            const modelArray = result.map(function (obj) {
                obj = new PedidoModel(obj);
                return obj;
            });
            return modelArray;
        }
        return [];
    }

    /**
     * Salva um objeto PedidoModel no banco de dados. Os atributos que devem ser informados: "Mesa_id", "estado". Os atributos: "id" "dataAtualizacao" e "dataCriacao" são criados automaticamente.
     * @returns {PedidoModel} Retorna um objeto PedidoModel com as informações recém inseridas no banco de dados.
     */
    async save() {
        // Gera um timestamp no formato "YYYY-MM-DD HH:MM:SS" com a data e horário atual
        const timestamp = (new Date()).toISOString().slice(0, 19).replace('T', ' ');
        const result = await DataBase.executeSQLQuery(`INSERT INTO Pedido VALUES (null, ?, ?, ?, ?);`,
            [
                this.Mesa_id,
                this.estado,
                timestamp,
                timestamp
            ]
        );
        const pedido = await DataBase.executeSQLQuery(`SELECT * FROM Pedido WHERE Pedido.id = ?`, [result.insertId]);
        return new PedidoModel(pedido[0]);
    }

    /**
     * Atualiza um objeto PedidoModel no banco de dados. Os atributos que devem ser informados: "Mesa_id", "estado". O atributo: "dataAtualizacao" é atualizado automaticamente. Os atributos: "id" e "dataCriacao" não são alterados.
     * @returns {TipoProdutoModel} Retorna um objeto TipoProdutoModel com as informações atualizadas no banco de dados.
     */
    async update() {
        // Gera um timestamp no formato "YYYY-MM-DD HH:MM:SS" com a data e horário atual
        const timestamp = (new Date()).toISOString().slice(0, 19).replace('T', ' ');
        const result = await DataBase.executeSQLQuery(`UPDATE Pedido
                                                           SET Mesa_id = ?,
                                                               estado = ?,
                                                               dataAtualizacao = ?
                                                           WHERE Pedido.id = ?`,
            [
                this.Mesa_id,
                this.estado,
                timestamp,
                this.id
            ]
        );
        const pedido = await DataBase.executeSQLQuery(`SELECT * FROM Pedido WHERE Pedido.id = ?`, [this.id]);
        return new PedidoModel(pedido[0]);
    }

    /**
     * Deleta um objeto PedidoModel no banco de dados.
     * @returns {PedidoModel} Retorna um objeto PedidoModel com as informações removidas banco de dados.
     */
    async delete() {
        const result = await DataBase.executeSQLQuery(`DELETE FROM Pedido WHERE Pedido.id = ?`, [this.id]);
        return this;
    }
}

module.exports = PedidoModel;