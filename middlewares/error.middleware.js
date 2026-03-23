// ------------------------------------------------------
// MIDDLEWARE GLOBAL DE ERRORES
// ------------------------------------------------------

const errorMiddleware = (err, req, res, next) => {

    // Log completo del error (debug)
    console.error("🔥 ERROR DETECTADO:");
    console.error("Mensaje:", err.message);
    console.error("Stack:", err.stack);

    // Status code controlado o 500 por defecto
    const statusCode = err.statusCode || 500;

    // Respuesta estándar
    return res.status(statusCode).json({
        status: "error",
        message: err.message || "Error interno del servidor",
        data: null
    });
};


// ------------------------------------------------------
// EXPORTAR
// ------------------------------------------------------

module.exports = errorMiddleware;