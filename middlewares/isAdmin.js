// ------------------------------------------------------
// MIDDLEWARE: VALIDAR ADMIN
// ------------------------------------------------------

const isAdmin = (req, res, next) => {

    // req.user viene del middleware de autenticación (JWT)
    // ahí está el usuario decodificado

    // Si no existe usuario o no tiene rol admin
    if (!req.user || req.user.rol !== "admin") {

        // Bloqueamos acceso
        return res.status(403).json({
            status: "error",
            message: "Acceso denegado: solo administradores",
            data: null
        });
    }

    // Si es admin → continúa
    next();
};


// Exportamos el middleware
module.exports = isAdmin;