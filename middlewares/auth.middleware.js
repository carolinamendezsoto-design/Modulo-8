// ------------------------------------------------------
// IMPORTAMOS JWT
// ------------------------------------------------------

const jwt = require("jsonwebtoken"); // Librería que permite verificar y decodificar tokens JWT


// ------------------------------------------------------
// EXPORTAMOS EL MIDDLEWARE
// ------------------------------------------------------

module.exports = (req, res, next) => { // Función middleware (req = request, res = response, next = siguiente middleware)

    try { // Bloque try para capturar errores

        // --------------------------------------------------
        // OBTENER HEADER AUTHORIZATION
        // --------------------------------------------------

        const authHeader = req.headers.authorization; // Extraemos el header Authorization (ej: "Bearer eyJhbGciOiJIUzI1NiIs...")

        // Validamos si existe el header
        if (!authHeader) { // Si no viene header

            return res.status(401).json({ // Respondemos error 401 (no autorizado)
                ok: false, // Indicamos que la operación falló
                message: "Token no proporcionado" // Mensaje claro
            });
        }

        // --------------------------------------------------
        // EXTRAER TOKEN DEL FORMATO "Bearer TOKEN"
        // --------------------------------------------------

        const token = authHeader.split(" ")[1]; // Separamos por espacio y tomamos la segunda parte (el token)

        // Validamos si el token existe
        if (!token) { // Si no hay token válido

            return res.status(401).json({ // Error 401
                ok: false,
                message: "Token inválido" // Mensaje claro
            });
        }

        // --------------------------------------------------
        // VERIFICAR TOKEN
        // --------------------------------------------------

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificamos el token usando la clave secreta

        // --------------------------------------------------
        // GUARDAR USUARIO EN REQUEST
        // --------------------------------------------------

        req.user = decoded; // Guardamos el payload del token en req.user para usarlo después en controllers

        // --------------------------------------------------
        // CONTINUAR FLUJO
        // --------------------------------------------------

        next(); // Pasamos al siguiente middleware o controlador

    } catch (error) { // Si ocurre cualquier error

        console.error("Error en auth middleware:", error.message); // Mostramos error en consola

        return res.status(401).json({ // Respondemos error 401
            ok: false,
            message: "Token inválido o expirado" // Mensaje estándar
        });
    }
};