function notFoundMiddleware(req, res, next) {
    res.status(404).render("status/404", {
        title: "404 - Page Not Found"
    });
}

module.exports = notFoundMiddleware;