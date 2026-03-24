// ------------------------------------------------------
// IMPORTAR MODELO
// ------------------------------------------------------

const { Notificacion } = require("../models"); // Modelo Sequelize


// ------------------------------------------------------
// CREAR NOTIFICACIÓN
// ------------------------------------------------------

const crearNotificacion = async (usuarioId, mensaje) => {

    return await Notificacion.create({ // Insert en DB
        usuarioId, // Usuario destino
        mensaje    // Texto
    });
};


// ------------------------------------------------------
// OBTENER NOTIFICACIONES
// ------------------------------------------------------

const getNotificaciones = async (usuarioId) => {

    return await Notificacion.findAll({

        where: { usuarioId }, // Filtramos por usuario

        order: [["createdAt", "DESC"]] // Orden más reciente primero
    });
};


// ------------------------------------------------------
// MARCAR COMO LEÍDAS
// ------------------------------------------------------

const marcarComoLeidas = async (usuarioId) => {

    await Notificacion.update(

        { leido: true }, // Cambiamos estado

        {
            where: { usuarioId } // Solo de ese usuario
        }
    );
};


// ------------------------------------------------------
// EXPORTAR
// ------------------------------------------------------

module.exports = {
    crearNotificacion,  // Crear
    getNotificaciones,  // Obtener
    marcarComoLeidas    // Marcar leídas
};