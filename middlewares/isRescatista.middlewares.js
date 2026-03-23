// ------------------------------------------------------
// MIDDLEWARE: SOLO RESCATISTA
// ------------------------------------------------------

// Exportamos middleware de Express
module.exports = (req, res, next) => {

    // --------------------------------------------------
    // VALIDAR AUTENTICACIÓN
    // --------------------------------------------------

    // Validamos que el usuario esté autenticado
    if (!req.user) {
        return res.status(401).json({
            status: "error", // error de autenticación
            message: "Usuario no autenticado", // mensaje claro
            data: null
        });
    }

    // --------------------------------------------------
    // VALIDAR ROL RESCATISTA
    // --------------------------------------------------

    // Si el rol NO es rescatista
    if (req.user.rol !== "rescatista") {
        return res.status(403).json({
            status: "error", // error de permisos
            message: "Solo rescatistas pueden realizar esta acción", // mensaje claro
            data: null
        });
    }

    // --------------------------------------------------
    // CONTINUAR FLUJO
    // --------------------------------------------------

    // Si cumple, dejamos pasar al siguiente middleware o controller
    next();
};