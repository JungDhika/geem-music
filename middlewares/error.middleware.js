function errorMiddleware(err, req, res, next) {
    console.error(err);

    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).render("status/500", {
        title: "500 - Server Error",
        message: process.env.NODE_ENV === "production"
            ? "Terjadi kesalahan pada server."
            : err.message
    });
}

module.exports = errorMiddleware;