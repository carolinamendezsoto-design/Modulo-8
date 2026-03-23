// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos la librería jsonwebtoken para trabajar con JWT (crear/verificar tokens)
const jwt = require("jsonwebtoken");


// ------------------------------------------------------
// MIDDLEWARE DE AUTENTICACIÓN
// ------------------------------------------------------

// Definimos el middleware que protegerá las rutas privadas
const authMiddleware = (req, res, next) => {

    // --------------------------------------------------
    // OBTENER HEADER AUTHORIZATION
    // --------------------------------------------------

    // Accedemos al header "authorization" enviado en la request
    const authHeader = req.headers["authorization"];

    // Si no existe el header, bloqueamos el acceso
    if (!authHeader) {
        return res.status(401).json({
            status: "error", // indicamos error
            message: "Acceso denegado. Token requerido", // mensaje claro
            data: null // mantenemos estructura consistente
        });
    }

    // --------------------------------------------------
    // VALIDAR FORMATO DEL TOKEN
    // --------------------------------------------------

    // Separamos el contenido del header por espacios
    const parts = authHeader.split(" ");

    // Validamos que tenga exactamente 2 partes y comience con "Bearer"
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(400).json({
            status: "error", // error de formato
            message: "Formato de token inválido", // mensaje explicativo
            data: null
        });
    }

    // Extraemos el token (segunda parte del header)
    const token = parts[1];

    // --------------------------------------------------
    // VERIFICAR TOKEN
    // --------------------------------------------------

    try {

        // Verificamos el token usando la clave secreta definida en .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Guardamos la información decodificada del usuario en req.user
        // Aquí normalmente vienen datos como id y rol
        req.user = decoded;

        // Continuamos con el siguiente middleware o controlador
        next();

    } catch (err) {

        // Si el token es inválido o expiró, devolvemos error
        return res.status(401).json({
            status: "error", // error de autenticación
            message: "Token inválido o expirado", // mensaje claro
            data: null
        });
    }
};


// ------------------------------------------------------
// EXPORTAR MIDDLEWARE
// ------------------------------------------------------

// Exportamos el middleware para poder usarlo en las rutas
module.exports = authMiddleware;