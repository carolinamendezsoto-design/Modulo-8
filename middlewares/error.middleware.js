// ------------------------------------------------------
// MIDDLEWARE GLOBAL DE ERRORES
// ------------------------------------------------------

// Definimos el middleware de errores
// Recibe 4 parámetros (esto es lo que lo hace especial en Express):
// err → el error que ocurrió
// req → la petición
// res → la respuesta
// next → siguiente middleware (aunque aquí no lo usamos)
const errorMiddleware = (err, req, res, next) => {

    // --------------------------------------------------
    // MOSTRAR ERROR EN CONSOLA
    // --------------------------------------------------

    // Mostramos el mensaje del error en la consola del servidor
    // Esto es útil para debugging (ver qué pasó internamente)
    console.error("Error:", err.message);


    // --------------------------------------------------
    // DEFINIR STATUS CODE
    // --------------------------------------------------

    // Si el error tiene un statusCode definido lo usamos
    // Si no, usamos 500 (error interno del servidor)
    const statusCode = err.statusCode || 500;


    // --------------------------------------------------
    // RESPUESTA AL CLIENTE
    // --------------------------------------------------

    // Enviamos una respuesta JSON estructurada
    res.status(statusCode).json({

        // Indicamos que hubo un error
        status: "error",

        // Enviamos el mensaje del error
        message: err.message
    });
};


// ------------------------------------------------------
// EXPORTAR MIDDLEWARE
// ------------------------------------------------------

// Exportamos el middleware para poder usarlo en app.js
module.exports = errorMiddleware;