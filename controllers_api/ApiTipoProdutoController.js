const TipoProdutoModel = require("../models/TipoProdutoModel");

/**
 * Controlador para gerenciar tipos de produto através de endpoints da API.
 * @class
 */
class ApiTipoProdutoController {

    /**
     * Recupera todos os tipos de produto.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @returns {Promise<Object>} A resposta contendo todos os tipos de produto.
     */
    async apiGetAll(req, res) {
        try {
            const tipoProdutos = await TipoProdutoModel.findAll();
            return res.status(200).json(tipoProdutos);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    /**
     * Recupera um único tipo de produto pelo ID.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @param {Number} req.params.tipoProdutoId Parâmetro passado pela rota do express
     * @returns {Promise<Object>} A resposta contendo o tipo de produto solicitado.
     */
    async apiGetOne(req, res) {
        try {
            const tipoProduto = await TipoProdutoModel.findOne(req.params.tipoProdutoId);
            if(!tipoProduto)
                return res.status(404).json({ error: "TipoProduto não encontrado." });
            return res.status(200).json(tipoProduto);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    /**
     * Armazena um novo tipo de produto.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @returns {Promise<Object>} A resposta contendo o tipo de produto armazenado.
     */
    async apiStore(req, res) {
        try {
            const tipoProduto = new TipoProdutoModel();
            tipoProduto.descricao = req.body.tipoProduto.descricao;
            const result = await tipoProduto.save();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    /**
     * Atualiza um tipo de produto existente.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @param {Number} req.params.tipoProdutoId Parâmetro passado pela rota do express
     * @returns {Promise<Object>} A resposta contendo o tipo de produto atualizado.
     */
    async apiUpdate(req, res) {
        try {
            const tipoProduto = await TipoProdutoModel.findOne(req.params.tipoProdutoId);
            if(!tipoProduto)
                return res.status(404).json({ error: "TipoProduto não encontrado." });
            tipoProduto.descricao = req.body.tipoProduto.descricao;
            const result = await tipoProduto.update();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    /**
     * Exclui um tipo de produto.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @param {Number} req.params.tipoProdutoId Parâmetro passado pela rota do express
     * @returns {Promise<Object>} A resposta indicando o status da exclusão.
     */
    async apiDestroy(req, res) {
        try {
            const tipoProduto = await TipoProdutoModel.findOne(req.params.tipoProdutoId);
            if(!tipoProduto)
                return res.status(404).json({ error: "TipoProduto não encontrado." });
            const result = await tipoProduto.delete();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = new ApiTipoProdutoController();