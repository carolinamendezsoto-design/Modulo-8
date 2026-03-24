// ------------------------------------------------------
// IMPORTAR REPOSITORIO
// ------------------------------------------------------

// Ahora importamos desde la capa de acceso a datos (Repositorio)
const notificacionRepository = require("../repositories/notificacion.repository");


// ------------------------------------------------------
// CREAR NOTIFICACIÓN (LÓGICA DE NEGOCIO)
// ------------------------------------------------------

const crearNotificacion = async (usuarioId, mensaje) => {
    
    // Aquí podríamos agregar reglas de negocio (ej. validaciones extra)
    // Delegamos la escritura a la base de datos
    return await notificacionRepository.crearNotificacion(usuarioId, mensaje);
};


// ------------------------------------------------------
// OBTENER NOTIFICACIONES
// ------------------------------------------------------

const getNotificaciones = async (usuarioId) => {

    // Delegamos la consulta a la base de datos
    return await notificacionRepository.getNotificaciones(usuarioId);
};


// ------------------------------------------------------
// MARCAR COMO LEÍDAS
// ------------------------------------------------------

const marcarComoLeidas = async (usuarioId) => {

    // Delegamos la actualización a la base de datos
    await notificacionRepository.marcarComoLeidas(usuarioId);
};


// ------------------------------------------------------
// EXPORTAR SERVICIOS
// ------------------------------------------------------

module.exports = {
    crearNotificacion,  // Crear
    getNotificaciones,  // Obtener
    marcarComoLeidas    // Marcar leídas
};