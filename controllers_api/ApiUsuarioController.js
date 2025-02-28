const UsuarioModel = require("../models/UsuarioModel");
const jwt = require("jsonwebtoken");
const config = require("config");

/**
 * Controlador para gerenciar usuarios através de endpoints da API.
 * @class
 */
class ApiUsuarioController {

    /**
     * Recupera um único usuario pelo ID.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @param {Number} req.params.usuarioId Parâmetro passado pela rota do express
     * @returns {Promise<Object>} A resposta contendo o usuario solicitado.
     */
    async apiGetOne(req, res) {
        try {
            const usuario = await UsuarioModel.findOne(req.params.usuarioId);
            if(!usuario)
                return res.status(404).json({ error: "Usuario não encontrado." });
            if(req.usuario.id != usuario.id)
                return res.status(401).json({ error: `O id = ${req.params.usuarioId} não pertence ao usuário autenticado.` });
            return res.status(200).json(usuario);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    /**
     * Armazena um novo usuario.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @returns {Promise<Object>} A resposta contendo o usuario armazenado.
     */
    async apiStore(req, res) {
        try {
            const usuario = new UsuarioModel();
            usuario.nome = req.body.usuario.nome;
            usuario.email = req.body.usuario.email;
            usuario.senha = req.body.usuario.senha;
            const result = await usuario.save();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    /**
     * Atualiza um usuario existente.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @param {Number} req.params.usuarioId Parâmetro passado pela rota do express
     * @returns {Promise<Object>} A resposta contendo o usuario atualizado.
     */
    async apiUpdate(req, res) {
        try {
            const usuario = await UsuarioModel.findOne(req.params.usuarioId);
            if(!usuario)
                return res.status(404).json({ error: "Usuario não encontrado." });
            if(req.usuario.id != usuario.id)
                return res.status(401).json({ error: `O id = ${req.params.usuarioId} não pertence ao usuário autenticado.` });
            usuario.nome = req.body.usuario.nome;
            usuario.email = req.body.usuario.email;
            usuario.senha = req.body.usuario.senha;
            const result = await usuario.update();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    /**
     * Exclui um usuario.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @param {Number} req.params.usuarioId Parâmetro passado pela rota do express
     * @returns {Promise<Object>} A resposta indicando o status da exclusão.
     */
    async apiDestroy(req, res) {
        try {
            const usuario = await UsuarioModel.findOne(req.params.usuarioId);
            if(!usuario)
                return res.status(404).json({ error: "Usuario não encontrado." });
            if(req.usuario.id != usuario.id)
                return res.status(401).json({ error: `O id = ${req.params.usuarioId} não pertence ao usuário autenticado.` });
            const result = await usuario.delete();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    /**
     * Processa o login do usuário.
     */
    async apiLogin(req, res) {
        const { email, senha } = req.body.usuario;

        // Valida se os campos foram preenchidos
        if (!email || !senha) {
            return res.status(400).json({ message: "Usuário e senha são obrigatórios." });
        }

        // Busca o usuário no banco de dados
        const usuario = await UsuarioModel.validateUser(email, senha);
        if (!usuario) {
            return res.status(401).json({ message: "Credenciais inválidas." });
        }

        // Gera o token JWT
        const token = jwt.sign(
            { id: usuario.id, usuario: usuario.nome },
            process.env.JWT_SECRET || config.get("app.secret"),
            { expiresIn: "1h" } // Token expira em 1 hora
        );

        return res.json({ token });
    }
}

module.exports = new ApiUsuarioController();