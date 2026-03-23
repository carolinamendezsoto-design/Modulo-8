// ------------------------------------------------------
// MIDDLEWARE GENÉRICO DE ROLES
// ------------------------------------------------------

// Esta función genera middlewares según roles permitidos
const authorizeRoles = (...rolesPermitidos) => {

    // Retorna un middleware de Express
    return (req, res, next) => {

        // --------------------------------------------------
        // VALIDAR AUTENTICACIÓN
        // --------------------------------------------------

        // Verificamos que exista usuario en request (authMiddleware)
        if (!req.user) {
            return res.status(401).json({
                status: "error",
                message: "Usuario no autenticado",
                data: null
            });
        }

        // --------------------------------------------------
        // VALIDAR ROL
        // --------------------------------------------------

        // Si el rol del usuario no está permitido
        if (!rolesPermitidos.includes(req.user.rol)) {
            return res.status(403).json({
                status: "error",
                message: "No tienes permisos para esta acción",
                data: null
            });
        }

        // --------------------------------------------------
        // CONTINUAR
        // --------------------------------------------------

        next();
    };
};


// ------------------------------------------------------
// EXPORTAR
// ------------------------------------------------------

module.exports = authorizeRoles;