// ------------------------------------------------------
// MIDDLEWARE GLOBAL DE ERRORES
// ------------------------------------------------------

// Este middleware captura TODOS los errores de la aplicación
// IMPORTANTE: debe tener 4 parámetros para que Express lo reconozca
const errorMiddleware = (err, req, res, next) => {

    // --------------------------------------------------
    // LOG DEL ERROR (DEBUG PROFESIONAL)
    // --------------------------------------------------

    // Mostramos información completa del error en consola
    console.error("🔥 ERROR DETECTADO:");
    console.error("Mensaje:", err.message);
    console.error("Stack:", err.stack);

    // --------------------------------------------------
    // DEFINIR STATUS CODE
    // --------------------------------------------------

    // Usamos statusCode si viene definido (errores controlados)
    // Si no existe → error interno del servidor
    const statusCode = err.statusCode || 500;

    // --------------------------------------------------
    // RESPUESTA ESTANDARIZADA
    // --------------------------------------------------

    res.status(statusCode).json({

        // Indicamos error
        status: "error",

        // Mensaje claro para cliente
        message: err.message || "Error interno del servidor",

        // Siempre mantener estructura consistente
        data: null
    });
};


// ------------------------------------------------------
// EXPORTAR MIDDLEWARE
// ------------------------------------------------------

module.exports = errorMiddleware;