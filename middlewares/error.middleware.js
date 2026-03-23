// ------------------------------------------------------
// MIDDLEWARE GLOBAL DE ERRORES
// ------------------------------------------------------

// Este middleware captura TODOS los errores de la aplicación
// Se ejecuta automáticamente cuando haces next(error)

const errorMiddleware = (err, req, res, next) => {

    // --------------------------------------------------
    // LOG DEL ERROR (DEBUG)
    // --------------------------------------------------

    // Mostramos información completa en consola
    console.error("🔥 ERROR DETECTADO:");
    console.error("Mensaje:", err.message);
    console.error("Stack:", err.stack);


    // --------------------------------------------------
    // STATUS CODE
    // --------------------------------------------------

    // Si el error tiene statusCode lo usamos
    // si no → error interno 500
    const statusCode = err.statusCode || 500;


    // --------------------------------------------------
    // RESPUESTA ESTÁNDAR
    // --------------------------------------------------

    // Enviamos respuesta consistente al frontend
    return res.status(statusCode).json({
        status: "error",
        message: err.message || "Error interno del servidor",
        data: null
    });
};


// ------------------------------------------------------
// EXPORTAR MIDDLEWARE
// ------------------------------------------------------

module.exports = errorMiddleware;