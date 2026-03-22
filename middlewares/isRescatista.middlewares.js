// ------------------------------------------------------
// MIDDLEWARE: SOLO RESCATISTA
// ------------------------------------------------------

// Exportamos una función middleware de Express
module.exports = (req, res, next) => {

    // req.user viene desde el middleware de autenticación (auth)
    // Aquí tenemos los datos del usuario logueado
    const user = req.user;

    // Verificamos si el rol del usuario NO es "rescatista"
    if (user.rol !== "rescatista") {

        // Si no cumple → bloqueamos acceso
        return res.status(403).json({
            status: "error", // estado de error
            message: "Solo rescatistas pueden realizar esta acción" // mensaje claro
        });
    }

    // Si el usuario SÍ es rescatista → continúa la ejecución
    next();
};