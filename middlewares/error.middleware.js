// ------------------------------------------------------
// MIDDLEWARE GLOBAL DE ERRORES
// ------------------------------------------------------

// Definimos el middleware de errores de Express
// IMPORTANTE: tiene 4 parámetros (err, req, res, next)
// Eso es lo que le indica a Express que es un middleware de error
const errorMiddleware = (err, req, res, next) => {

    // --------------------------------------------------
    // LOG DEL ERROR (DEBUG)
    // --------------------------------------------------

    // Mostramos el error en consola para debugging en el servidor
    // Esto ayuda a los desarrolladores a identificar el problema
    console.error("🔥 Error:", err.message);

    // --------------------------------------------------
    // DEFINIR STATUS CODE
    // --------------------------------------------------

    // Si el error tiene statusCode lo usamos
    // Si no, usamos 500 (error interno del servidor)
    const statusCode = err.statusCode || 500;

    // --------------------------------------------------
    // RESPUESTA AL CLIENTE
    // --------------------------------------------------

    // Enviamos respuesta JSON estructurada (como pide la consigna)
    return res.status(statusCode).json({

        // Indicamos que ocurrió un error
        status: "error",

        // Enviamos el mensaje del error
        message: err.message || "Error interno del servidor",

        // Mantenemos consistencia de estructura en la API
        data: null
    });
};


// ------------------------------------------------------
// EXPORTAR MIDDLEWARE
// ------------------------------------------------------

// Exportamos el middleware para usarlo en app.js
module.exports = errorMiddleware;