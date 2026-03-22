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
        return res.status(401).json({
            status: "error",
            message: "Acceso denegado. Token requerido",
            data: null
        });
    }


    // --------------------------------------------------
    // VALIDAR FORMATO BEARER TOKEN
    // --------------------------------------------------

    // El formato esperado es: "Bearer TOKEN"
    const parts = authHeader.split(" ");

    // Validamos que tenga 2 partes y que empiece con Bearer
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(400).json({
            status: "error",
            message: "Formato de token inválido",
            data: null
        });
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
        // Aquí debería venir: id y rol
        req.user = decoded;

        // Continuamos al siguiente middleware
        next();

    } catch (err) {

        // Si el token es inválido o expiró → error 401
        return res.status(401).json({
            status: "error",
            message: "Token inválido o expirado",
            data: null
        });
    }
};


// ------------------------------------------------------
// EXPORTAR MIDDLEWARE
// ------------------------------------------------------

// Exportamos el middleware para usarlo en rutas
module.exports = authMiddleware;