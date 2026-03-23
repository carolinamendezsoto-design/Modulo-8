// ------------------------------------------------------
// IMPORTAR SERVICIO
// ------------------------------------------------------

// Importamos el service donde vive la lógica de autenticación
// (validación de usuario, generación de token, etc.)
const authService = require("../services/auth.service");


// ------------------------------------------------------
// CONTROLADOR LOGIN
// ------------------------------------------------------

const login = async (req, res, next) => {

    try {

        // --------------------------------------------------
        // EXTRAER DATOS DEL BODY
        // --------------------------------------------------

        // Obtenemos email y password enviados por el cliente
        const { email, password } = req.body;

        // --------------------------------------------------
        // VALIDACIONES
        // --------------------------------------------------

        // Validamos que ambos campos existan
        if (!email || !password) {
            return res.status(400).json({
                status: "error",
                message: "Email y contraseña son obligatorios",
                data: null
            });
        }

        // Validamos formato de email (regex básica)
        const emailRegex = /\S+@\S+\.\S+/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: "error",
                message: "Formato de email inválido",
                data: null
            });
        }

        // --------------------------------------------------
        // LLAMAR AL SERVICE
        // --------------------------------------------------

        // El service se encarga de validar credenciales y generar token
        const result = await authService.login({ email, password });

        // --------------------------------------------------
        // RESPUESTA EXITOSA
        // --------------------------------------------------

        return res.status(200).json({
            status: "success",
            message: "Login exitoso",
            data: result // incluye token + usuario
        });

    } catch (error) {

        // --------------------------------------------------
        // MANEJO DE ERRORES
        // --------------------------------------------------

        // Si el error viene controlado desde el service
        if (error.statusCode) {
            return res.status(error.statusCode).json({
                status: "error",
                message: error.message,
                data: null
            });
        }

        // Error inesperado del servidor
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