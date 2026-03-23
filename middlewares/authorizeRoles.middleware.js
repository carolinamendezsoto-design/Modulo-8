// ------------------------------------------------------
// MIDDLEWARE GENÉRICO DE ROLES
// ------------------------------------------------------

// Esta función permite restringir rutas por rol
// Ejemplo: authorizeRoles("admin")

const authorizeRoles = (...rolesPermitidos) => {

    // Retorna un middleware de Express
    return (req, res, next) => {

        // --------------------------------------------------
        // VALIDAR AUTENTICACIÓN
        // --------------------------------------------------

        // Si no existe usuario → no pasó auth
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