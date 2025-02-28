const MesaModel = require("../models/MesaModel");

/**
 * Controlador para gerenciar mesas através de endpoints da API.
 * @class
 */
class ApiMesaController {

    /**
     * Recupera todas as mesas.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @returns {Promise<Object>} A resposta contendo todas as mesas.
     */
    async apiGetAll(req, res) {
        try {
            const mesas = await MesaModel.findAll();
            return res.status(200).json(mesas);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    /**
     * Recupera uma única mesa pelo ID.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @param {Number} req.params.mesaId Parâmetro passado pela rota do express
     * @returns {Promise<Object>} A resposta contendo a mesa solicitada.
     */
    async apiGetOne(req, res) {
        try {
            const mesa = await MesaModel.findOne(req.params.mesaId);
            if(!mesa)
                return res.status(404).json({ error: "Mesa não encontrada." });
            return res.status(200).json(mesa);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    /**
     * Armazena uma nova mesa.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @returns {Promise<Object>} A resposta contendo a mesa armazenada.
     */
    async apiStore(req, res) {
        try {
            const mesa = new MesaModel();
            mesa.numero = req.body.mesa.numero;
            mesa.estado = req.body.mesa.estado;
            const result = await mesa.save();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    /**
     * Atualiza uma mesa existente.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @param {Number} req.params.mesaId Parâmetro passado pela rota do express
     * @returns {Promise<Object>} A resposta contendo a mesa atualizada.
     */
    async apiUpdate(req, res) {
        try {
            const mesa = await MesaModel.findOne(req.params.mesaId);
            if(!mesa)
                return res.status(404).json({ error: "Mesa não encontrada." });
            mesa.numero = req.body.mesa.numero;
            mesa.estado = req.body.mesa.estado;
            const result = await mesa.update();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    /**
     * Exclui uma mesa.
     * @param {express.Request} req O objeto de requisição do Express.
     * @param {express.Response} res O objeto de resposta do Express.
     * @param {Number} req.params.mesaId Parâmetro passado pela rota do express
     * @returns {Promise<Object>} A resposta indicando o status da exclusão.
     */
    async apiDestroy(req, res) {
        try {
            const mesa = await MesaModel.findOne(req.params.mesaId);
            if(!mesa)
                return res.status(404).json({ error: "Mesa não encontrada." });
            const result = await mesa.delete();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = new ApiMesaController();