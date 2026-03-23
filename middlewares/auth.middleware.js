// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

const jwt = require("jsonwebtoken"); // manejo de tokens


// ------------------------------------------------------
// MIDDLEWARE DE AUTENTICACIÓN
// ------------------------------------------------------

const authMiddleware = (req, res, next) => {

    // --------------------------------------------------
    // OBTENER HEADER AUTHORIZATION
    // --------------------------------------------------

    const authHeader = req.headers["authorization"]; // header

    // Si no hay token
    if (!authHeader) {
        return res.status(401).json({
            status: "error",
            message: "Acceso denegado. Token requerido",
            data: null
        });
    }


    // --------------------------------------------------
    // VALIDAR FORMATO
    // --------------------------------------------------

    const parts = authHeader.split(" "); // "Bearer token"

    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(400).json({
            status: "error",
            message: "Formato de token inválido",
            data: null
        });
    }

    const token = parts[1]; // extraemos token


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