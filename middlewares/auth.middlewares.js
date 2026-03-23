// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Librería para crear y verificar JWT
const jwt = require("jsonwebtoken");


// ------------------------------------------------------
// MIDDLEWARE DE AUTENTICACIÓN
// ------------------------------------------------------

const authMiddleware = (req, res, next) => {

    // --------------------------------------------------
    // OBTENER HEADER AUTHORIZATION
    // --------------------------------------------------

    // Intentamos obtener el header Authorization
    const authHeader = req.headers["authorization"];

    // Si no viene token → acceso denegado
    if (!authHeader) {
        return res.status(401).json({
            status: "error",
            message: "Acceso denegado. Token requerido",
            data: null
        });
    }

    // --------------------------------------------------
    // VALIDAR FORMATO DEL TOKEN
    // --------------------------------------------------

    // Formato esperado: "Bearer TOKEN"
    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(400).json({
            status: "error",
            message: "Formato de token inválido. Debe ser: Bearer TOKEN",
            data: null
        });
    }

    // Extraemos el token
    const token = parts[1];

    // --------------------------------------------------
    // VERIFICAR TOKEN
    // --------------------------------------------------

    try {

        // Verificamos el token usando la clave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Guardamos los datos del usuario en la request
        // Esto permite usar req.user en cualquier controller
        req.user = decoded;

        // Continuamos flujo
        next();

    } catch (error) {

        // --------------------------------------------------
        // MANEJO DE ERRORES JWT (MEJORADO)
        // --------------------------------------------------

        // Token expirado
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                status: "error",
                message: "Token expirado",
                data: null
            });
        }

        // Token inválido
        return res.status(401).json({
            status: "error",
            message: "Token inválido",
            data: null
        });
    }
};


// ------------------------------------------------------
// EXPORTAR MIDDLEWARE
// ------------------------------------------------------

module.exports = authMiddleware;