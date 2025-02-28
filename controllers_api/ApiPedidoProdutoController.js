const PedidoProdutoModel = require("../models/PedidoProdutoModel");

/**
 * Controlador para gerenciar pedidos de produtos através de endpoints da API.
 * @class
 */
class ApiPedidoProdutoController {
    
    /**
     * Recupera todos os pedidos de produtos.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @returns {Promise<Object>} A resposta contendo todos os pedidos de produtos.
     */
    async apiGetAll(req, res) {
        try {
            const pedidosProdutos = await PedidoProdutoModel.findAll();
            return res.status(200).json(pedidosProdutos);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    /**
     * Recupera um único pedido de produto pelo ID do pedido e ID do produto.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @param {Number} req.params.pedidoId Parâmetro passado pela rota do express
     * @param {Number} req.params.produtoId Parâmetro passado pela rota do express
     * @returns {Promise<Object>} A resposta contendo o pedido de produto solicitado.
     */
    async apiGetOne(req, res) {
        try {
            const pedidoProduto = await PedidoProdutoModel.findOne(req.params.pedidoId, req.params.produtoId);
            if(!pedidoProduto)
                return res.status(404).json({ error: "PedidoProduto não encontrado." });
            return res.status(200).json(pedidoProduto);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    /**
     * Armazena um novo pedido de produto.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @returns {Promise<Object>} A resposta contendo o pedido de produto armazenado.
     */
    async apiStore(req, res) {
        try {
            const pedidoProduto = new PedidoProdutoModel();
            pedidoProduto.Pedido_id = req.body.pedidoProduto.Pedido_id;
            pedidoProduto.Produto_id = req.body.pedidoProduto.Produto_id;
            pedidoProduto.precoVenda = req.body.pedidoProduto.precoVenda;
            pedidoProduto.quantidade = req.body.pedidoProduto.quantidade;
            pedidoProduto.estadoValorAnulado = req.body.pedidoProduto.estadoValorAnulado;
            pedidoProduto.estadoPago = req.body.pedidoProduto.estadoPago;
            pedidoProduto.estadoCupomImpresso = req.body.pedidoProduto.estadoCupomImpresso;
            pedidoProduto.estadoComandaImpressa = req.body.pedidoProduto.estadoComandaImpressa;
            pedidoProduto.estadoRecebido = req.body.pedidoProduto.estadoRecebido;
            pedidoProduto.observacao = req.body.pedidoProduto.observacao;
            const result = await pedidoProduto.save();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    /**
     * Atualiza um pedido de produto existente.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @param {Number} req.params.pedidoId Parâmetro passado pela rota do express
     * @param {Number} req.params.produtoId Parâmetro passado pela rota do express
     * @returns {Promise<Object>} A resposta contendo o pedido de produto atualizado.
     */
    async apiUpdate(req, res) {
        try {
            const pedidoProduto = await PedidoProdutoModel.findOne(req.params.pedidoId, req.params.produtoId);
            if(!pedidoProduto)
                return res.status(404).json({ error: "PedidoProduto não encontrado." });
            pedidoProduto.Pedido_id = req.body.pedidoProduto.Pedido_id;
            pedidoProduto.Produto_id = req.body.pedidoProduto.Produto_id;
            pedidoProduto.precoVenda = req.body.pedidoProduto.precoVenda;
            pedidoProduto.quantidade = req.body.pedidoProduto.quantidade;
            pedidoProduto.estadoValorAnulado = req.body.pedidoProduto.estadoValorAnulado;
            pedidoProduto.estadoPago = req.body.pedidoProduto.estadoPago;
            pedidoProduto.estadoCupomImpresso = req.body.pedidoProduto.estadoCupomImpresso;
            pedidoProduto.estadoComandaImpressa = req.body.pedidoProduto.estadoComandaImpressa;
            pedidoProduto.estadoRecebido = req.body.pedidoProduto.estadoRecebido;
            pedidoProduto.observacao = req.body.pedidoProduto.observacao;
            const result = await pedidoProduto.update(req.params.pedidoId, req.params.produtoId);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    /**
     * Exclui um pedido de produto.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @param {Number} req.params.pedidoId Parâmetro passado pela rota do express
     * @param {Number} req.params.produtoId Parâmetro passado pela rota do express
     * @returns {Promise<Object>} A resposta indicando o status da exclusão.
     */
    async apiDestroy(req, res) {
        try {
            const pedidoProduto = await PedidoProdutoModel.findOne(req.params.pedidoId, req.params.produtoId);
            if(!pedidoProduto)
                return res.status(404).json({ error: "PedidoProduto não encontrado." });
            const result = await pedidoProduto.delete();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    /**
     * Recupera todos os pedidos de produtos inativos pelo ID da mesa.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @returns {Promise<Object>} A resposta contendo todos os pedidos de produtos inativos.
     */
    async apiGetAllInaciveByMesaId(req, res) {
        try {
            const pedidosProdutos = await PedidoProdutoModel.findAllByMesaIdAndInactivePedidosWithPedidoAndProdutoInformation(req.params.mesaId);
            if(!pedidosProdutos)
                return res.status(404).json({ error: "Pedido Produtos não encontrados." });
            return res.status(200).json(pedidosProdutos);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    /**
     * Recupera um único pedido de produto pelo ID da mesa e pedidos ativos.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @param {Number} req.params.Mesa_id Parâmetro passado pela rota do express
     * @returns {Promise<Object>} A resposta contendo os pedidos de produtos solicitados.
     */
    async apiGetOneByMesaIdAndActiveOrders(req, res) {
        try {
            const pedidoProdutos = await PedidoProdutoModel.findByMesaIdAndActiveOrders(req.params.Mesa_id);
            if(!pedidosProdutos)
                return res.status(404).json({ error: "Pedido Produtos não encontrados." });
            return res.status(200).json(pedidoProdutos);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    /**
     * Recupera todos os pedidos de produtos ativos pelo ID da mesa.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @param {Number} req.params.Mesa_id Parâmetro passado pela rota do express
     * @returns {Promise<Object>} A resposta contendo todos os pedidos de produtos ativos.
     */
    async apiGetAllActiveByMesaId(req, res) {
        try {
            const pedidosProdutos = await PedidoProdutoModel.findAllByMesaIdAndActivePedidosWithPedidoAndProdutoInformation(req.params.mesaId);
            if(!pedidosProdutos)
                return res.status(404).json({ error: "Pedido Produtos não encontrados." });
            return res.status(200).json(pedidosProdutos);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = new ApiPedidoProdutoController();