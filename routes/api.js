const express = require("express");
const apiJwtAuthMiddleware = require("../route_middlewares/apiJwtAuthMiddleware");
const apiProdutoController = require("../controllers_api/ApiProdutoController");
const apiTipoProdutoController = require("../controllers_api/ApiTipoProdutoController");
const apiMesaController = require("../controllers_api/ApiMesaController");
const apiPedidoController = require("../controllers_api/ApiPedidoController");
const apiPedidoProdutoController = require("../controllers_api/ApiPedidoProdutoController");
const apiUsuarioController = require("../controllers_api/ApiUsuarioController");
const router = express.Router();

// Rotas de Produto
router.get("/api/produto", apiJwtAuthMiddleware, apiProdutoController.apiGetAll); // Devolver todos os Produtos no formato JSON
router.get("/api/produto/:produtoId", apiJwtAuthMiddleware, apiProdutoController.apiGetOne); // Devolver um Produto no formato JSON
router.post("/api/produto", apiJwtAuthMiddleware, apiProdutoController.apiStore); // Armazenar um Produto
router.put("/api/produto/:produtoId", apiJwtAuthMiddleware, apiProdutoController.apiUpdate); // Atualizar um Produto
router.delete("/api/produto/:produtoId", apiJwtAuthMiddleware, apiProdutoController.apiDestroy); // Remover um Produto

// Rotas de TipoProduto
router.get("/api/tipoproduto", apiJwtAuthMiddleware, apiTipoProdutoController.apiGetAll); // Devolver todos os TipoProdutos no formato JSON
router.get("/api/tipoproduto/:tipoProdutoId", apiJwtAuthMiddleware, apiTipoProdutoController.apiGetOne); // Devolver um TipoProduto no formato JSON
router.post("/api/tipoproduto", apiJwtAuthMiddleware, apiTipoProdutoController.apiStore); // Armazenar um TipoProduto
router.put("/api/tipoproduto/:tipoProdutoId", apiJwtAuthMiddleware, apiTipoProdutoController.apiUpdate); // Atualizar um TipoProduto
router.delete("/api/tipoproduto/:tipoProdutoId", apiJwtAuthMiddleware, apiTipoProdutoController.apiDestroy); // Remover um TipoProduto

// Rotas de Mesa
router.get("/api/mesa", apiJwtAuthMiddleware, apiMesaController.apiGetAll); // Devolver todos as Mesas no formato JSON
router.get("/api/mesa/:mesaId", apiJwtAuthMiddleware, apiMesaController.apiGetOne); // Devolver uma Mesa no formato JSON
router.post("/api/mesa", apiJwtAuthMiddleware, apiMesaController.apiStore); // Armazenar uma Mesa
router.put("/api/mesa/:mesaId", apiJwtAuthMiddleware, apiMesaController.apiUpdate); // Atualizar uma Mesa
router.delete("/api/mesa/:mesaId", apiJwtAuthMiddleware, apiMesaController.apiDestroy); // Remover uma Mesa

// Rotas de Pedido
router.get("/api/pedido", apiJwtAuthMiddleware, apiPedidoController.apiGetAll); // Devolver todos os Pedidos no formato JSON
router.get("/api/pedido/:pedidoId", apiJwtAuthMiddleware, apiPedidoController.apiGetOne); // Devolver um Pedido no formato JSON
router.post("/api/pedido", apiJwtAuthMiddleware, apiPedidoController.apiStore); // Armazenar um Pedido
router.put("/api/pedido/:pedidoId", apiJwtAuthMiddleware, apiPedidoController.apiUpdate); // Atualizar um Pedido
router.delete("/api/pedido/:pedidoId", apiJwtAuthMiddleware, apiPedidoController.apiDestroy); // Remover um Pedido

// Rotas de PedidoProduto
router.get("/api/pedidoproduto", apiJwtAuthMiddleware, apiPedidoProdutoController.apiGetAll); // Devolver todos os PedidoProdutos no formato JSON
router.get("/api/pedidoproduto/:pedidoId/:produtoId", apiJwtAuthMiddleware, apiPedidoProdutoController.apiGetOne); // Devolver um PedidoProduto no formato JSON
router.post("/api/pedidoproduto", apiJwtAuthMiddleware, apiPedidoProdutoController.apiStore); // Armazenar um PedidoProduto
router.put("/api/pedidoproduto/:pedidoId/:produtoId", apiJwtAuthMiddleware, apiPedidoProdutoController.apiUpdate); // Atualizar um PedidoProduto
router.delete("/api/pedidoproduto/:pedidoId/:produtoId", apiJwtAuthMiddleware, apiPedidoProdutoController.apiDestroy); // Remover um PedidoProduto
router.get("/api/pedidoproduto/ativo/mesa/:mesaId", apiJwtAuthMiddleware, apiPedidoProdutoController.apiGetAllActiveByMesaId); // Busca os PedidoProdutos ativos em uma mesa
router.get("/api/pedidoproduto/inativo/mesa/:mesaId", apiJwtAuthMiddleware, apiPedidoProdutoController.apiGetAllInaciveByMesaId); // Busca os PedidoProdutos inativos em uma mesa

// Rotas de Usuário - Sem rota de logout (feito no front destruindo o token jwt)
router.post("/api/usuario/login", apiUsuarioController.apiLogin); // Rota de login
router.get("/api/usuario/:usuarioId", apiJwtAuthMiddleware, apiUsuarioController.apiGetOne); // Devolver um Usuario no formato JSON
router.post("/api/usuario", apiJwtAuthMiddleware, apiUsuarioController.apiStore); // Armazenar um Usuario
router.put("/api/usuario/:usuarioId", apiJwtAuthMiddleware, apiUsuarioController.apiUpdate); // Atualizar um Usuario
router.delete("/api/usuario/:usuarioId", apiJwtAuthMiddleware, apiUsuarioController.apiDestroy); // Remover um Usuario

module.exports = router;