const jwt = require("jsonwebtoken");
const config = require("config");

const SECRET_KEY = process.env.JWT_SECRET || config.get("app.secret");

const apiJwtAuthMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(403).json({ message: "Token não fornecido" });
    }

    jwt.verify(token.replace("Bearer ", ""), SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token inválido" });
        }

        req.usuario = decoded; // Coloca o objeto de usuário dentro da requisição
        next();
    });
};

module.exports = apiJwtAuthMiddleware;