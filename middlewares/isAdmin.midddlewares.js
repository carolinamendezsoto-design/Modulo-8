// ------------------------------------------------------
// MIDDLEWARE: SOLO ADMIN
// ------------------------------------------------------

// Exportamos directamente una función middleware de Express
module.exports = (req, res, next) => {

    // --------------------------------------------------
    // VALIDAR AUTENTICACIÓN
    // --------------------------------------------------

    // Verificamos que exista req.user (lo setea authMiddleware)
    if (!req.user) {
        return res.status(401).json({
            status: "error", // estado de error
            message: "Usuario no autenticado", // mensaje claro
            data: null // mantenemos estructura consistente
        });
    }

    // --------------------------------------------------
    // VALIDAR ROL ADMIN
    // --------------------------------------------------

    // Si el rol del usuario NO es admin
    if (req.user.rol !== "admin") {
        return res.status(403).json({
            status: "error", // error de permisos
            message: "Acceso solo para administradores", // mensaje claro
            data: null
        });
    }

    // --------------------------------------------------
    // CONTINUAR FLUJO
    // --------------------------------------------------

    // Si el usuario es admin, permitimos continuar
    next();
};