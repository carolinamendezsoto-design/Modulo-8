// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Librería para crear y verificar JWT
const jwt = require("jsonwebtoken");


// ------------------------------------------------------
// MIDDLEWARE DE AUTENTICACIÓN
// ------------------------------------------------------

// Este middleware protege rutas verificando el token JWT
const authMiddleware = (req, res, next) => {

    // --------------------------------------------------
    // OBTENER HEADER AUTHORIZATION
    // --------------------------------------------------

    // Intentamos obtener el header Authorization enviado por el cliente
    const authHeader = req.headers["authorization"];

    // Si no existe → el usuario no está autenticado
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

    // El formato correcto es: "Bearer TOKEN"
    const parts = authHeader.split(" ");

    // Validamos estructura del header
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(400).json({
            status: "error",
            message: "Formato de token inválido. Debe ser: Bearer TOKEN",
            data: null
        });
    }

    // Extraemos el token real
    const token = parts[1];

    // --------------------------------------------------
    // VERIFICAR TOKEN
    // --------------------------------------------------

    try {

        // Decodificamos el token usando la clave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Guardamos los datos del usuario en la request
        // Esto permite usar req.user en controllers y otros middlewares
        req.user = decoded;

        // Continuamos al siguiente middleware/controlador
        next();

    } catch (error) {

        // --------------------------------------------------
        // MANEJO DE ERRORES JWT
        // --------------------------------------------------

        // Si el token expiró
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                status: "error",
                message: "Token expirado",
                data: null
            });
        }

        // Si el token es inválido
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