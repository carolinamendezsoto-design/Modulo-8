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
// "next" permite enviar errores al middleware global
const login = async (req, res, next) => {

    try {

        // --------------------------------------------------
        // LLAMADA AL SERVICE
        // --------------------------------------------------

        // Enviamos el body (email y password) al service
        const result = await authService.login(req.body);


        // --------------------------------------------------
        // RESPUESTA
        // --------------------------------------------------

        // Respondemos con el resultado del service
        res.json(result);


    } catch (error) {

        // --------------------------------------------------
        // MANEJO DE ERRORES
        // --------------------------------------------------

        // Enviamos el error al middleware global
        next(error);
    }
};


// ------------------------------------------------------
// EXPORTAR CONTROLADOR
// ------------------------------------------------------

module.exports = {
    login
};