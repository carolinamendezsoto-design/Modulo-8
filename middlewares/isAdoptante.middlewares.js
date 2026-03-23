// ------------------------------------------------------
// MIDDLEWARE: SOLO ADOPTANTE
// ------------------------------------------------------

// Exportamos middleware
module.exports = (req, res, next) => {

    // --------------------------------------------------
    // VALIDAR AUTENTICACIÓN
    // --------------------------------------------------

    // Verificamos que el usuario esté autenticado
    if (!req.user) {
        return res.status(401).json({
            status: "error", // error de autenticación
            message: "Usuario no autenticado", // mensaje claro
            data: null
        });
    }

    // --------------------------------------------------
    // VALIDAR ROL ADOPTANTE
    // --------------------------------------------------

    // Si el usuario NO tiene rol adoptante
    if (req.user.rol !== "adoptante") {
        return res.status(403).json({
            status: "error", // error de permisos
            message: "Solo adoptantes pueden realizar esta acción", // mensaje claro
            data: null
        });
    }

    // --------------------------------------------------
    // CONTINUAR FLUJO
    // --------------------------------------------------

    // Si cumple la condición, dejamos pasar la request
    next();
};