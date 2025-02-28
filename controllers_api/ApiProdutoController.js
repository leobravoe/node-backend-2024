const ProdutoModel = require("../models/ProdutoModel");

/**
 * Controlador para gerenciar produtos através de endpoints da API.
 * @class
 */
class ApiProdutoController {

    /**
     * Recupera todos os produtos.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @returns {Promise<Object>} A resposta contendo todos os produtos.
     */
    async apiGetAll(req, res) {
        try {
            const produtos = await ProdutoModel.findAll();
            return res.status(200).json(produtos);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    /**
     * Recupera um único produto pelo ID.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @param {Number} req.params.produtoId Parâmetro passado pela rota do express
     * @returns {Promise<Object>} A resposta contendo o produto solicitado.
     */
    async apiGetOne(req, res) {
        try {
            const produto = await ProdutoModel.findOne(req.params.produtoId);
            if(!produto)
                return res.status(404).json({ error: "Produto não encontrado." });
            return res.status(200).json(produto);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    /**
     * Armazena um novo produto.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @returns {Promise<Object>} A resposta contendo o produto armazenado.
     */
    async apiStore(req, res) {
        try {
            const produto = new ProdutoModel();
            produto.numero = req.body.produto.numero;
            produto.nome = req.body.produto.nome;
            produto.preco = req.body.produto.preco;
            produto.TipoProduto_id = req.body.produto.TipoProduto_id;
            produto.ingredientes = req.body.produto.ingredientes;
            const result = await produto.save();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    /**
     * Atualiza um produto existente.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @param {Number} req.params.produtoId Parâmetro passado pela rota do express
     * @returns {Promise<Object>} A resposta contendo o produto atualizado.
     */
    async apiUpdate(req, res) {
        try {
            const produto = await ProdutoModel.findOne(req.params.produtoId);
            if(!produto)
                return res.status(404).json({ error: "Produto não encontrado." });
            produto.numero = req.body.produto.numero;
            produto.nome = req.body.produto.nome;
            produto.preco = req.body.produto.preco;
            produto.TipoProduto_id = req.body.produto.TipoProduto_id;
            produto.ingredientes = req.body.produto.ingredientes;
            const result = await produto.update();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    /**
     * Exclui um produto.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @param {Number} req.params.produtoId Parâmetro passado pela rota do express
     * @returns {Promise<Object>} A resposta indicando o status da exclusão.
     */
    async apiDestroy(req, res) {
        try {
            const produto = await ProdutoModel.findOne(req.params.produtoId);
            if(!produto)
                return res.status(404).json({ error: "Produto não encontrado." });
            const result = await produto.delete();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = new ApiProdutoController();