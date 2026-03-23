// ------------------------------------------------------
// IMPORTAR REPOSITORY
// ------------------------------------------------------

// Importamos la capa de acceso a datos (repository)
// Aquí es donde realmente se interactúa con la base de datos
const solicitudRepository = require("../repositories/solicitud.repository");


// =======================================================
// CREAR SOLICITUD
// =======================================================

const createSolicitud = async ({ usuarioId, mascotaId }) => {

    // --------------------------------------------------
    // VALIDACIONES DE NEGOCIO
    // --------------------------------------------------

    // Validamos que ambos campos sean enviados
    // Esto evita errores en la base de datos y asegura integridad
    if (!usuarioId || !mascotaId) {

        // Creamos un error personalizado
        const error = new Error("usuarioId y mascotaId son requeridos");

        // Asignamos código HTTP para manejo posterior en middleware
        error.statusCode = 400;

        // Lanzamos el error para que lo capture el controller
        throw error;
    }

    // --------------------------------------------------
    // LLAMADA AL REPOSITORY
    // --------------------------------------------------

    // Delegamos la lógica de persistencia al repository
    // IMPORTANTE: el repository ya valida duplicados (buena práctica)
    const nuevaSolicitud = await solicitudRepository.createSolicitud({
        usuarioId,
        mascotaId
    });

    // Retornamos solo datos (NO respuesta HTTP → buena arquitectura)
    return nuevaSolicitud;
};



// =======================================================
// OBTENER SOLICITUDES POR MASCOTA
// =======================================================

const getSolicitudesByMascota = async (mascotaId) => {

    // Validación básica de entrada
    if (!mascotaId) {

        const error = new Error("mascotaId es requerido");
        error.statusCode = 400;
        throw error;
    }

    // Consultamos al repository
    const solicitudes = await solicitudRepository.getSolicitudesByMascota(mascotaId);

    // Retornamos resultados
    return solicitudes;
};



// =======================================================
// OBTENER SOLICITUDES POR USUARIO
// =======================================================

const getSolicitudesByUsuario = async (usuarioId) => {

    // Validación de parámetro requerido
    if (!usuarioId) {

        const error = new Error("usuarioId es requerido");
        error.statusCode = 400;
        throw error;
    }

    // Llamada al repository
    const solicitudes = await solicitudRepository.getSolicitudesByUsuario(usuarioId);

    // Retorno limpio (solo datos)
    return solicitudes;
};



// =======================================================
// CAMBIAR ESTADO DE SOLICITUD
// =======================================================

const updateSolicitudEstado = async (id, estado) => {

    // Validación de parámetros obligatorios
    if (!id || !estado) {

        const error = new Error("ID y estado requeridos");
        error.statusCode = 400;
        throw error;
    }

    // Llamamos al repository para actualizar
    const solicitudActualizada = await solicitudRepository.updateSolicitudEstado(id, estado);

    // Validamos si la solicitud existe
    if (!solicitudActualizada) {

        const error = new Error("Solicitud no encontrada");
        error.statusCode = 404;
        throw error;
    }

    // Retornamos la solicitud actualizada
    return solicitudActualizada;
};



// =======================================================
// OBTENER TODAS LAS SOLICITUDES (ADMIN)
// =======================================================

const getAllSolicitudes = async () => {

    // No requiere validaciones porque es una consulta global
    // (la protección se hace en middleware de roles)

    const solicitudes = await solicitudRepository.getAllSolicitudes();

    return solicitudes;
};



// ------------------------------------------------------
// EXPORTAR FUNCIONES DEL SERVICE
// ------------------------------------------------------

// Exportamos todas las funciones para que el controller pueda usarlas
module.exports = {
    createSolicitud,
    getSolicitudesByMascota,
    getSolicitudesByUsuario,
    updateSolicitudEstado,
    getAllSolicitudes
};