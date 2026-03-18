// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos jsonwebtoken para verificar el token
const jwt = require("jsonwebtoken");


// ------------------------------------------------------
// MIDDLEWARE DE AUTENTICACIÓN
// ------------------------------------------------------

// Este middleware protege rutas verificando el JWT
const authMiddleware = (req, res, next) => {

    // --------------------------------------------------
    // OBTENER HEADER AUTHORIZATION
    // --------------------------------------------------

    // Obtenemos el header Authorization
    const authHeader = req.headers["authorization"];

    // Si no viene el header → error 401 (no autorizado)
    if (!authHeader) {
        const error = new Error("Acceso denegado. Token requerido");
        error.statusCode = 401;
        return next(error);
    }


    // --------------------------------------------------
    // FORMATO BEARER TOKEN
    // --------------------------------------------------

    // El formato esperado es: "Bearer TOKEN"
    // Separamos en 2 partes
    const parts = authHeader.split(" ");

    // Validamos formato correcto
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        const error = new Error("Formato de token inválido");
        error.statusCode = 400;
        return next(error);
    }

    // Extraemos el token real
    const token = parts[1];


    // --------------------------------------------------
    // VERIFICAR TOKEN
    // --------------------------------------------------

    try {

        // Verificamos el token con la clave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // --------------------------------------------------
        // GUARDAR USUARIO EN REQUEST
        // --------------------------------------------------

        // Guardamos los datos del usuario en req.user
        // Esto permite usarlo en controllers (ej: req.user.id)
        req.user = decoded;

        // Continuamos al siguiente middleware o controller
        next();

    } catch (err) {

        // Si el token es inválido o expiró → error 401
        const error = new Error("Token inválido o expirado");
        error.statusCode = 401;
        next(error);
    }
};


// ------------------------------------------------------
// EXPORTAR MIDDLEWARE
// ------------------------------------------------------

// Exportamos el middleware para usarlo en rutas
module.exports = authMiddleware;