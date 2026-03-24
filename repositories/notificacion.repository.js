// ------------------------------------------------------
// IMPORTAR MODELO
// ------------------------------------------------------

// Importamos el modelo Sequelize (Base de datos)
const { Notificacion } = require("../models");


// =======================================================
// CREAR NOTIFICACIÓN EN BD
// =======================================================

const crearNotificacion = async (usuarioId, mensaje) => {

    // Guarda una nueva notificación en la base de datos
    return await Notificacion.create({
        usuarioId, // Destinatario
        mensaje    // Texto de la alerta
    });
};


// =======================================================
// OBTENER NOTIFICACIONES DE UN USUARIO
// =======================================================

const getNotificaciones = async (usuarioId) => {

    // Retorna las notificaciones ordenadas por las más recientes
    return await Notificacion.findAll({

        where: { usuarioId },

        order: [["createdAt", "DESC"]]

    });
};


// =======================================================
// MARCAR TODAS COMO LEÍDAS
// =======================================================

const marcarComoLeidas = async (usuarioId) => {

    // Actualiza el estado a leído en la base de datos
    await Notificacion.update(

        { leido: true },

        {
            where: { usuarioId }
        }

    );
};


// ------------------------------------------------------
// EXPORTAR
// ------------------------------------------------------

module.exports = {
    crearNotificacion,
    getNotificaciones,
    marcarComoLeidas
};
