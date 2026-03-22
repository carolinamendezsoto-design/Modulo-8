// ------------------------------------------------------
// MIDDLEWARE: SOLO ADMIN
// ------------------------------------------------------

// Exportamos middleware
module.exports = (req, res, next) => {

    // Verificamos rol del usuario autenticado
    if (req.user.rol !== "admin") {

        // Si no es admin → acceso denegado
        return res.status(403).json({
            status: "error",
            message: "Acceso solo para administradores"
        });
    }

    // Si es admin → continúa
    next();
};