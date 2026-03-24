// ------------------------------------------------------
// IMPORTAR SERVICE
// ------------------------------------------------------

const notificacionService = require("../services/notificacion.service"); // Importamos lógica de negocio


// ------------------------------------------------------
// OBTENER NOTIFICACIONES DEL USUARIO
// ------------------------------------------------------

const getNotificaciones = async (req, res, next) => { // Controller async

    try {

        const usuarioId = req.user.id; // Obtenemos usuario desde token (middleware)

        const notificaciones = await notificacionService.getNotificaciones(usuarioId); // Llamamos al service

        res.status(200).json({ // Respondemos OK
            status: "success",
            data: notificaciones // Enviamos datos
        });

    } catch (error) {

        next(error); // Enviamos error al middleware global
    }
};


// ------------------------------------------------------
// MARCAR NOTIFICACIONES COMO LEÍDAS
// ------------------------------------------------------

const marcarLeidas = async (req, res, next) => {

    try {

        const usuarioId = req.user.id; // Usuario autenticado

        await notificacionService.marcarComoLeidas(usuarioId); // Actualizamos DB

        res.status(200).json({
            status: "success",
            message: "Notificaciones marcadas como leídas"
        });

    } catch (error) {

        next(error); // Manejo de errores
    }
};


// ------------------------------------------------------
// EXPORTAR
// ------------------------------------------------------

module.exports = {
    getNotificaciones, // Obtener notificaciones
    marcarLeidas       // Marcar como leídas
};