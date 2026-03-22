// ------------------------------------------------------
// MIDDLEWARE: SOLO ADOPTANTE
// ------------------------------------------------------

// Exportamos middleware
module.exports = (req, res, next) => {

    // Obtenemos usuario autenticado
    const user = req.user;

    // Verificamos si NO es adoptante
    if (user.rol !== "adoptante") {

        // Bloqueamos acceso
        return res.status(403).json({
            status: "error",
            message: "Solo adoptantes pueden realizar esta acción"
        });
    }

    // Si cumple → seguimos
    next();
};