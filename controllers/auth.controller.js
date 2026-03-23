// ------------------------------------------------------
// IMPORTAR SERVICIO
// ------------------------------------------------------

// Importamos el servicio de autenticación donde vive la lógica del login
const authService = require("../services/auth.service");


// ------------------------------------------------------
// CONTROLADOR LOGIN
// ------------------------------------------------------

// Maneja la petición POST /auth/login
const login = async (req, res, next) => {

    try {

        // --------------------------------------------------
        // VALIDACIONES BÁSICAS (🔥 IMPORTANTE PARA LA NOTA)
        // --------------------------------------------------

        // Extraemos email y password del body
        const { email, password } = req.body;

        // Validamos que existan los campos obligatorios
        if (!email || !password) {
            return res.status(400).json({
                status: "error",
                message: "Email y contraseña son obligatorios",
                data: null
            });
        }

        // --------------------------------------------------
        // LLAMADA AL SERVICE
        // --------------------------------------------------

        // Enviamos los datos al service para validar usuario
        const result = await authService.login({ email, password });

        // --------------------------------------------------
        // RESPUESTA ESTÁNDAR (PRO 🔥)
        // --------------------------------------------------

        // Respondemos con estructura consistente (como pide la consigna)
        return res.status(200).json({
            status: "success",
            message: "Login exitoso",
            data: result
        });

    } catch (error) {

        // --------------------------------------------------
        // MANEJO DE ERRORES
        // --------------------------------------------------

        // Delegamos el error al middleware global de errores
        next(error);
    }
};


// ------------------------------------------------------
// EXPORTAR CONTROLADOR
// ------------------------------------------------------

// Exportamos el método login para usarlo en las rutas
module.exports = {
    login
};
