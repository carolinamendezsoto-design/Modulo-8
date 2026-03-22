// ------------------------------------------------------
// IMPORTAR SERVICIO
// ------------------------------------------------------

// Importamos el servicio de autenticación
// Aquí está toda la lógica del login
const authService = require("../services/auth.service");


// ------------------------------------------------------
// CONTROLADOR LOGIN
// ------------------------------------------------------

// Maneja la petición POST /auth/login
const login = async (req, res, next) => {

    try {

        // --------------------------------------------------
        // LLAMADA AL SERVICE
        // --------------------------------------------------

        // Enviamos email y password al service
        const result = await authService.login(req.body);


        // --------------------------------------------------
        // RESPUESTA ESTÁNDAR (PRO 🔥)
        // --------------------------------------------------

        // Respondemos con estructura consistente
        res.status(200).json({
            status: "success",
            message: "Login exitoso",
            data: result
        });

    } catch (error) {

        // --------------------------------------------------
        // MANEJO DE ERRORES
        // --------------------------------------------------

        // Delegamos el error al middleware global
        next(error);
    }
};


// ------------------------------------------------------
// EXPORTAR CONTROLADOR
// ------------------------------------------------------

module.exports = {
    login
};