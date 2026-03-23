// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Librería para manejar JWT
const jwt = require("jsonwebtoken");


// ------------------------------------------------------
// MIDDLEWARE DE AUTENTICACIÓN
// ------------------------------------------------------

// Este middleware protege rutas privadas verificando el token JWT
const authMiddleware = (req, res, next) => {

    // --------------------------------------------------
    // OBTENER HEADER AUTHORIZATION
    // --------------------------------------------------

    // Intentamos obtener el header Authorization
    const authHeader = req.headers["authorization"];

    // Si no existe → acceso denegado
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

    // Validamos estructura
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(400).json({
            status: "error",
            message: "Formato de token inválido",
            data: null
        });
    }

    // Extraemos token
    const token = parts[1];


    // --------------------------------------------------
    // VERIFICAR TOKEN
    // --------------------------------------------------

    try {

        // Decodificamos token con clave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Guardamos usuario en request
        req.user = decoded;

        // Continuamos flujo
        next();

    } catch (error) {

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
// EXPORTAR
// ------------------------------------------------------

module.exports = authMiddleware;