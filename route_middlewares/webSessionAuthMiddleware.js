const webSessionAuthMiddleware = (req, res, next) => {
    if (req.session && req.session.usuario) {
        // Usuário autenticado, permitir acesso
        return next();
    } else {
        // Redirecionar para a página de login
        req.session.message = ["danger", "Você precisa estar autenticado para acessar esta página."];
        return res.redirect("/usuario");
    }
};

module.exports = webSessionAuthMiddleware;
