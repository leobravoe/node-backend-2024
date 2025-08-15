// models/PedidoProdutoModel.js
const BaseModel = require("./BaseModel");
const DataBase = require("../database/DataBase");

class PedidoProdutoModel extends BaseModel {
    static tableName = "PedidoProduto";

    // IMPORTANTE: como a PK é composta e não é auto-incremento,
    // precisamos inserir os dois campos de PK no INSERT.
    static insertable = [
        "Pedido_id",
        "Produto_id",
        "precoVenda",
        "quantidade",
        "estadoValorAnulado",
        "estadoPago",
        "estadoCupomImpresso",
        "estadoComandaImpressa",
        "estadoRecebido",
        "observacao",
    ];

    constructor(data = {}) {
        super(data);
    }

    // --- Compatibilidade: manter assinatura antiga (dois parâmetros) ---
    // Agora delega para o BaseModel usando objeto de PK quando necessário.
    static async findOne(Pedido_id, Produto_id) {
        // Se receber um único objeto, use o BaseModel normalmente:
        if (arguments.length === 1 && Pedido_id && typeof Pedido_id === "object") {
            return super.findOne(Pedido_id);
        }
        // Assinatura antiga: (Pedido_id, Produto_id)
        return super.findOne({ Pedido_id, Produto_id });
    }

    // --- Consultas específicas com JOIN (mantidas como estavam) ---
    static async findAllByMesaIdAndActivePedidosWithPedidoAndProdutoInformation(Mesa_id) {
        const result = await DataBase.executeSQLQuery(
            `SELECT PedidoProduto.*, Pedido.Mesa_id, Pedido.estado, Produto.nome
         FROM PedidoProduto
         JOIN Pedido  on PedidoProduto.Pedido_id  = Pedido.id
         JOIN Produto on PedidoProduto.Produto_id = Produto.id
        WHERE Pedido.Mesa_id = ? AND Pedido.estado = 'A'
        ORDER BY PedidoProduto.Pedido_id DESC`,
            [Mesa_id]
        );
        return result && result.length > 0 ? result : [];
    }

    static async findAllByMesaIdAndInactivePedidosWithPedidoAndProdutoInformation(Mesa_id) {
        const result = await DataBase.executeSQLQuery(`
            SELECT PedidoProduto.*, Pedido.Mesa_id, Pedido.estado, Produto.nome
            FROM PedidoProduto
            JOIN Pedido  on PedidoProduto.Pedido_id  = Pedido.id
            JOIN Produto on PedidoProduto.Produto_id = Produto.id
            WHERE Pedido.Mesa_id = ? AND Pedido.estado = 'I'
            ORDER BY PedidoProduto.Pedido_id DESC`,
            [Mesa_id]
        );
        return result && result.length > 0 ? result : [];
    }

    // --- Compatibilidade: permitir atualização mudando PK (como antes) ---
    // Se você passar (pedidoId, produtoId) antigos, ele faz UPDATE definindo nova PK.
    // Se não passar, cai no update padrão do BaseModel (não altera PK).
    async update(pedidoId, produtoId) {
        if (typeof pedidoId !== "undefined" && typeof produtoId !== "undefined") {
            const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
            await DataBase.executeSQLQuery(
                `
                UPDATE PedidoProduto
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
                WHERE PedidoProduto.Pedido_id  = ? AND
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
                    produtoId,
                ]
            );
            // retorna o registro atualizado:
            return await PedidoProdutoModel.findOne(this.Pedido_id, this.Produto_id);
        }

        // Sem parâmetros = comportamento novo padrão (não altera PK):
        return await super.update();
    }
}

module.exports = PedidoProdutoModel;
