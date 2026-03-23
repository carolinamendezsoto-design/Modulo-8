// ------------------------------------------------------
// IMPORTAR SERVICIO
// ------------------------------------------------------

// Aquí vive la lógica de autenticación (validar usuario, generar token, etc.)
const authService = require("../services/auth.service");


// ------------------------------------------------------
// CONTROLADOR LOGIN
// ------------------------------------------------------

const login = async (req, res, next) => {

    try {

        // --------------------------------------------------
        // VALIDACIONES BÁSICAS
        // --------------------------------------------------

        const { email, password } = req.body;

        // Validación de campos obligatorios
        if (!email || !password) {
            return res.status(400).json({
                status: "error",
                message: "Email y contraseña son obligatorios",
                data: null
            });
        }

        // Validación básica de formato email (mejora nivel pro)
        const emailRegex = /\S+@\S+\.\S+/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: "error",
                message: "Formato de email inválido",
                data: null
            });
        }

        // --------------------------------------------------
        // LLAMADA AL SERVICE
        // --------------------------------------------------

        const result = await authService.login({ email, password });

        // --------------------------------------------------
        // RESPUESTA EXITOSA
        // --------------------------------------------------

        return res.status(200).json({
            status: "success",
            message: "Login exitoso",
            data: result // token + user info
        });

    } catch (error) {

        // --------------------------------------------------
        // MANEJO DE ERRORES CONTROLADO
        // --------------------------------------------------

        // Si el service envió error con statusCode → lo respetamos
        if (error.statusCode) {
            return res.status(error.statusCode).json({
                status: "error",
                message: error.message,
                data: null
            });
        }

        // Error inesperado
        return res.status(500).json({
            status: "error",
            message: "Error interno en login",
            data: null
        });
    }
};


// ------------------------------------------------------
// EXPORTAR CONTROLADOR
// ------------------------------------------------------

module.exports = {
    login
};