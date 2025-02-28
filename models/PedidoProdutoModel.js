const DataBase = require("../database/DataBase");

class PedidoProdutoModel {
    /** 
     * Os atributos da classe Model precisam ser correspondentes às colunas do banco de dados.
     */
    Pedido_id = null;
    Produto_id = null;
    precoVenda = null;
    quantidade = null;
    estadoValorAnulado = null;
    estadoPago = null;
    estadoCupomImpresso = null;
    estadoComandaImpressa = null;
    estadoRecebido = null;
    observacao = null;
    dataAtualizacao = null;
    dataCriacao = null;

    /**
     * Construtor da Classe PedidoProdutoModel
     * @param {PedidoProduto}      pedidoProduto      O objeto de entrada é simples (precisa conter apenas chave e valor, sem métodos) e precisa conter as chaves: "Pedido_id", "Produto_id", "precoVenda", "quantidade", "estadoValorAnulado", "estadoPago", "estadoCupomImpresso", "estadoComandaImpresso", "estadoRecebido", "dataAtualizacao" e "dataCriacao". A chave "observacao" é opcional. Esses campos são as colunas da tabela no banco de dados. Caso não passe um objeto com esses campos, um model vazio será criado.
     */
    constructor(pedidoProduto) {
        if (pedidoProduto &&
            "Pedido_id" in pedidoProduto &&
            "Produto_id" in pedidoProduto &&
            "precoVenda" in pedidoProduto &&
            "quantidade" in pedidoProduto &&
            "estadoValorAnulado" in pedidoProduto &&
            "estadoPago" in pedidoProduto &&
            "estadoCupomImpresso" in pedidoProduto &&
            "estadoComandaImpressa" in pedidoProduto &&
            "estadoRecebido" in pedidoProduto &&
            "dataAtualizacao" in pedidoProduto &&
            "dataCriacao" in pedidoProduto
        ) {
            this.Pedido_id = pedidoProduto.Pedido_id;
            this.Produto_id = pedidoProduto.Produto_id;
            this.precoVenda = pedidoProduto.precoVenda;
            this.quantidade = pedidoProduto.quantidade;
            this.estadoValorAnulado = pedidoProduto.estadoValorAnulado;
            this.estadoPago = pedidoProduto.estadoPago;
            this.estadoCupomImpresso = pedidoProduto.estadoCupomImpresso;
            this.estadoComandaImpressa = pedidoProduto.estadoComandaImpressa;
            this.estadoRecebido = pedidoProduto.estadoRecebido;
            this.observacao = pedidoProduto.observacao;
            this.dataAtualizacao = pedidoProduto.dataAtualizacao;
            this.dataCriacao = pedidoProduto.dataCriacao;
        }
    }

    /**
     * Busca todos objetos PedidoProdutoModel no banco de dados.
     * @return {[PedidoProdutoModel, ...]} Retorna um array com objetos PedidoProdutoModel que contém apenas as informações encontradas, caso não encontre, retorna um array vazio [].
     */
    static async findAll() {
        const result = await DataBase.executeSQLQuery(`SELECT * FROM PedidoProduto`);
        if (result && result.length > 0) {
            // Transforma um array de PedidoProdutoModels [PedidoProdutoModel, ...] em uma array de PedidoProdutoModel [PedidoProdutoModel, ...]
            const modelArray = result.map(function (obj) {
                obj = new PedidoProdutoModel(obj);
                return obj;
            });
            return modelArray;
        }
        return [];
    }

    /**
     * Busca um objeto PedidoProdutoModel no banco de dados
     * @param  {Number}               Pedido_id        ID do pedido a ser procurado no banco de dados.
     * @param  {Number}               Produto_id       ID do produto a ser procurado no banco de dados.
     * @return {PedidoProdutoModel}                    Retorna um objeto PedidoProdutoModel com as informações encontradas, caso não encontre, retorna null.
     */
    static async findOne(Pedido_id, Produto_id) {
        const result = await DataBase.executeSQLQuery(`SELECT * FROM PedidoProduto WHERE PedidoProduto.Pedido_id = ? and PedidoProduto.Produto_id = ?`, [Pedido_id, Produto_id]);
        if (result && result.length > 0)
            return new PedidoProdutoModel(result[0]);
        return null;
    }

    /**
     * Busca todos objetos simples PedidoProduto em uma mesa ATIVA no banco de dados, adicionando ao resultado a coluna "Mesa_id e estado" da tabela "Pedido" e a coluna "nome" de "Produto".
     * @param  {Number}     Mesa_id     ID da mesa a ser procurada no banco de dados.
     * @return {PedidoProduto}          Retorna um array de objetos simples PedidoProduto com as informações encontradas, adicionando ao resultado a coluna "Mesa_id e estado" da tabela "Pedido" e a coluna "nome" de "Produto".
     */
    static async findAllByMesaIdAndActivePedidosWithPedidoAndProdutoInformation(Mesa_id) {
        const result = await DataBase.executeSQLQuery(`SELECT PedidoProduto.*, Pedido.Mesa_id, Pedido.estado, Produto.nome
                                                       FROM PedidoProduto
                                                       JOIN Pedido on PedidoProduto.Pedido_id = Pedido.id
                                                       JOIN Produto on PedidoProduto.Produto_id = Produto.id
                                                       WHERE Pedido.Mesa_id = ? and Pedido.estado = 'A'
                                                       ORDER BY PedidoProduto.Pedido_id DESC`, [Mesa_id]);
        if (result && result.length > 0) {
            return result;
        }
        return [];
    }

    /**
     * Busca todos objetos simples PedidoProduto em uma mesa INATIVA no banco de dados, adicionando ao resultado a coluna "Mesa_id e estado" da tabela "Pedido" e a coluna "nome" de "Produto".
     * @param  {Number}     Mesa_id     ID da mesa a ser procurada no banco de dados.
     * @return {PedidoProduto}          Retorna um objeto simples PedidoProduto com as informações encontradas, adicionando ao resultado a coluna "Mesa_id e estado" da tabela "Pedido" e a coluna "nome" de "Produto".
     */
    static async findAllByMesaIdAndInactivePedidosWithPedidoAndProdutoInformation(Mesa_id) {
        const result = await DataBase.executeSQLQuery(`SELECT PedidoProduto.*, Pedido.Mesa_id, Pedido.estado, Produto.nome
                                                       FROM PedidoProduto
                                                       JOIN Pedido on PedidoProduto.Pedido_id = Pedido.id
                                                       JOIN Produto on PedidoProduto.Produto_id = Produto.id
                                                       WHERE Pedido.Mesa_id = ? and Pedido.estado = 'I'
                                                       ORDER BY PedidoProduto.Pedido_id DESC`, [Mesa_id]);
        if (result && result.length > 0) {
            return result;
        }
        return [];
    }

    /**
     * Salva um objeto PedidoProdutoModel no banco de dados. Os atributos que devem ser informados: "Pedido_id", "Produto_id", "estado", "precoVenda", "quantidade" e "observacao". Os atributos: "dataAtualizacao" e "dataCriacao" são criados automaticamente.
     * @returns {PedidoProdutoModel} Retorna um objeto PedidoProdutoModel com as informações recém inseridas no banco de dados.
     */
    async save() {
        // Gera um timestamp no formato "YYYY-MM-DD HH:MM:SS" com a data e horário atual
        const timestamp = (new Date()).toISOString().slice(0, 19).replace('T', ' ');
        const result = await DataBase.executeSQLQuery(`INSERT INTO PedidoProduto VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
            [
                this.Pedido_id,
                this.Produto_id,
                this.precoVenda,
                this.quantidade,
                this.estadoValorAnulado,
                this.estadoPago,
                this.estadoCupomImpresso,
                this.estadoComandaImpressa,
                this.estadoRecebido,
                this.observacao,
                timestamp,
                timestamp
            ]
        );
        const pedidoProduto = await DataBase.executeSQLQuery(`SELECT * FROM PedidoProduto WHERE PedidoProduto.Pedido_id = ? and PedidoProduto.Produto_id = ?`, [this.Pedido_id, this.Produto_id]);
        return new PedidoProdutoModel(pedidoProduto[0]);
    }

    /**
     * Atualiza um objeto PedidoProdutoModel no banco de dados. Os atributos que devem ser informados: "estado", "precoVenda", "quantidade" e "observacao". O atributo: "dataAtualizacao" é atualizado automaticamente. Os atributos: "Pedido_id", "Produto_id" e "dataCriacao" não são alterados.
     * @returns {TipoProdutoModel} Retorna um objeto TipoProdutoModel com as informações atualizadas no banco de dados.
     */
    async update(pedidoId, produtoId) {
        // Gera um timestamp no formato "YYYY-MM-DD HH:MM:SS" com a data e horário atual
        const timestamp = (new Date()).toISOString().slice(0, 19).replace('T', ' ');
        const result = await DataBase.executeSQLQuery(`UPDATE PedidoProduto
                                                       SET Pedido_id = ?,
                                                           Produto_id = ?,
                                                           precoVenda = ?,
                                                           quantidade = ?,
                                                           estadoValorAnulado = ?,
                                                           estadoPago = ?,
                                                           estadoCupomImpresso = ?,
                                                           estadoComandaImpressa = ?,
                                                           estadoRecebido = ?,
                                                           observacao = ?,
                                                           dataAtualizacao = ?
                                                       WHERE PedidoProduto.Pedido_id = ? and
                                                             PedidoProduto.Produto_id = ?`,
            [
                this.Pedido_id,
                this.Produto_id,
                this.precoVenda,
                this.quantidade,
                this.estadoValorAnulado,
                this.estadoPago,
                this.estadoCupomImpresso,
                this.estadoComandaImpressa,
                this.estadoRecebido,
                this.observacao,
                timestamp,
                pedidoId,
                produtoId
            ]
        );
        const pedidoProduto = await DataBase.executeSQLQuery(`SELECT * FROM PedidoProduto WHERE PedidoProduto.Pedido_id = ? and PedidoProduto.Produto_id = ?`, [this.Pedido_id, this.Produto_id]);
        return new PedidoProdutoModel(pedidoProduto[0]);
    }

    /**
     * Deleta um objeto PedidoProdutoModel no banco de dados.
     * @returns {PedidoProdutoModel} Retorna um objeto PedidoProdutoModel com as informações removidas banco de dados.
     */
    async delete() {
        const result = await DataBase.executeSQLQuery(`DELETE FROM PedidoProduto WHERE PedidoProduto.Pedido_id = ? and PedidoProduto.Produto_id = ?`, [this.Pedido_id, this.Produto_id]);
        return this;
    }
}

module.exports = PedidoProdutoModel;