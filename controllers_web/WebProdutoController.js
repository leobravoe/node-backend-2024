const ProdutoModel = require("../models/ProdutoModel");
const TipoProdutoModel = require("../models/TipoProdutoModel");

class WebProdutoController {
    /** 
    * Mostra uma tela com todos os recursos 
    * @param {*} req Requisição da rota do express 
    * @param {*} res Resposta da rota do express 
    */
    async index(req, res) {
        try {
            const message = req.session.message ? req.session.message : null;
            if (message) delete req.session.message;
            const produtos = await ProdutoModel.findAllWithTipoProdutoDescricao();
            return res.render("produto/index", { 
                layout: "layouts/main", 
                title: "Index de Produto", 
                produtos: produtos, 
                message: message, 
                csrfToken: req.csrfToken() 
            });
        } catch (error) {
            return res.render("produto/index", { 
                layout: "layouts/main", 
                title: "Index de Produto", 
                produtos: [], 
                message: ["danger", JSON.stringify(error)] 
            });
        }
    }

    /** 
    * Mostra um formulário para criação de um novo recurso 
    * @param {*} req Requisição da rota do express 
    * @param {*} res Resposta da rota do express 
    */
    async create(req, res) {
        try {
            const tipoProdutos = await TipoProdutoModel.findAll();
            return res.render("produto/create", { 
                layout: "layouts/main", 
                title: "Create de Produto", 
                tipoProdutos: tipoProdutos, 
                csrfToken: req.csrfToken() 
            });
        } catch (error) {
            req.session.message = ["danger", JSON.stringify(error)];
        }
        return res.redirect("/produto");
    }

    /** 
   * Salva um novo recurso no banco de dados 
   * @param {*} req Requisição da rota do express 
   * @param {*} res Resposta da rota do express 
   */
    async store(req, res) {
        try {
            const produto = new ProdutoModel();
            produto.numero = req.body.numero;
            produto.nome = req.body.nome;
            produto.preco = req.body.preco;
            produto.TipoProduto_id = req.body.TipoProduto_id;
            produto.ingredientes = req.body.ingredientes;
            const result = await produto.save();
            req.session.message = ["success", `Produto ${result.id}-${result.nome} salvo com sucesso.`];
        } catch (error) {
            req.session.message = ["danger", JSON.stringify(error)];
        }
        return res.redirect(`/produto?message`);
    }


    /** 
   * Mostra um recurso específico 
   * @param {*} req Requisição da rota do express 
   * @param {*} res Resposta da rota do express 
   * @param {Number} req.params.produtoId Parâmetro passado pela rota do express 
   */
    async show(req, res) {
        try {
            const produto = await ProdutoModel.findOneWithTipoProdutoDescricao(req.params.produtoId);
            if (produto) {
                return res.render("produto/show", { 
                    layout: "layouts/main", 
                    title: "Show de Produto", 
                    produto: produto 
                });
            }
            req.session.message = ["warning", "Produto não encontrado."];
        } catch (error) {
            req.session.message = ["danger", JSON.stringify(error)];
        }
        return res.redirect("/produto");
    }

    /** 
   * Mostra um formulário para editar um recurso específico 
   * @param {*} req Requisição da rota do express 
   * @param {*} res Resposta da rota do express 
   * @param {Number} req.params.produtoId Parâmetro passado pela rota do express 
   */
    async edit(req, res) {
        try {
            const produto = await ProdutoModel.findOne(req.params.produtoId);
            const tipoProdutos = await TipoProdutoModel.findAll();
            if (produto) {
                return res.render("produto/edit", { 
                    layout: "layouts/main", 
                    title: "Edit de Produto", 
                    produto: produto, 
                    tipoProdutos: tipoProdutos, 
                    csrfToken: req.csrfToken() 
                });
            }
            req.session.message = ["warning", "Produto não encontrado."];
        } catch (error) {
            req.session.message = ["danger", JSON.stringify(error)];
        }
        return res.redirect("/produto");
    }

    /** 
   * Atualiza um recurso existente no banco de dados 
   * @param {*} req Requisição da rota do express 
   * @param {*} res Resposta da rota do express 
   * @param {Number} req.params.produtoId Parâmetro passado pela rota do express 
   */
    async update(req, res) {
        try {
            const produto = await ProdutoModel.findOne(req.params.produtoId);
            if (!produto) {
                req.session.message = ["warning", "Produto não encontrado."];
                return res.redirect("/produto");
            }
            produto.numero = req.body.numero;
            produto.nome = req.body.nome;
            produto.preco = req.body.preco;
            produto.TipoProduto_id = req.body.TipoProduto_id;
            produto.ingredientes = req.body.ingredientes;
            const result = await produto.update();
            req.session.message = ["success", `Produto ${result.id}-${result.nome} editado com sucesso.`];
        } catch (error) {
            req.session.message = ["danger", JSON.stringify(error)];
        }
        return res.redirect("/produto");
    }

    /** 
   * Remove um recurso existente do banco de dados 
   * @param {*} req Requisição da rota do express 
   * @param {*} res Resposta da rota do express 
   * @param {Number} req.params.produtoId Parâmetro passado pela rota do express 
   */
    async destroy(req, res) {
        try {
            const produto = await ProdutoModel.findOne(req.params.produtoId);
            if (!produto) {
                req.session.message = ["warning", "Produto não encontrado."];
                return res.redirect("/produto");
            }
            const result = await produto.delete();
            req.session.message = ["success", `Produto ${result.id}-${result.nome} removido com sucesso.`];
        } catch (error) {
            req.session.message = ["danger", JSON.stringify(error)];
        }
        return res.redirect("/produto");
    }

}

module.exports = new WebProdutoController();