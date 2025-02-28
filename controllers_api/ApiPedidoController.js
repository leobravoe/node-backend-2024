const PedidoModel = require("../models/PedidoModel");

/**
 * Controlador para gerenciar pedidos através de endpoints da API.
 * @class
 */
class ApiPedidoController {
    
    /**
     * Recupera todos os pedidos.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @returns {Promise<Object>} A resposta contendo todos os pedidos.
     */
    async apiGetAll(req, res) {
        try {
            const pedidos = await PedidoModel.findAll();
            return res.status(200).json(pedidos);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    /**
     * Recupera um único pedido pelo ID.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @param {Number} req.params.pedidoId Parâmetro passado pela rota do express
     * @returns {Promise<Object>} A resposta contendo o pedido solicitado.
     */
    async apiGetOne(req, res) {
        try {
            const pedido = await PedidoModel.findOne(req.params.pedidoId);
            if(!pedido)
                return res.status(404).json({ error: "Pedido não encontrado." });
            return res.status(200).json(pedido);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    /**
     * Armazena um novo pedido.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @returns {Promise<Object>} A resposta contendo o pedido armazenado.
     */
    async apiStore(req, res) {
        try {
            const pedido = new PedidoModel();
            pedido.Mesa_id = req.body.pedido.Mesa_id;
            pedido.estado = req.body.pedido.estado;
            const result = await pedido.save();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    /**
     * Atualiza um pedido existente.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @param {Number} req.params.pedidoId Parâmetro passado pela rota do express
     * @returns {Promise<Object>} A resposta contendo o pedido atualizado.
     */
    async apiUpdate(req, res) {
        try {
            const pedido = await PedidoModel.findOne(req.params.pedidoId);
            if(!pedido)
                return res.status(404).json({ error: "Pedido não encontrado." });
            pedido.Mesa_id = req.body.pedido.Mesa_id;
            pedido.estado = req.body.pedido.estado;
            const result = await pedido.update();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    /**
     * Exclui um pedido.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @param {Number} req.params.pedidoId Parâmetro passado pela rota do express
     * @returns {Promise<Object>} A resposta indicando o status da exclusão.
     */
    async apiDestroy(req, res) {
        try {
            const pedido = await PedidoModel.findOne(req.params.pedidoId);
            if(!pedido)
                return res.status(404).json({ error: "Pedido não encontrado." });
            const result = await pedido.delete();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = new ApiPedidoController();