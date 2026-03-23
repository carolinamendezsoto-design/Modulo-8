// ------------------------------------------------------
// IMPORTAR REPOSITORY
// ------------------------------------------------------

const solicitudRepository = require("../repositories/solicitud.repository");


// =======================================================
// CREAR SOLICITUD
// =======================================================

const createSolicitud = async ({ usuarioId, mascotaId }) => {

    // --------------------------------------------------
    // VALIDACIONES
    // --------------------------------------------------

    if (!usuarioId || !mascotaId) {
        const error = new Error("usuarioId y mascotaId son requeridos");
        error.statusCode = 400;
        throw error;
    }

    // --------------------------------------------------
    // CREACIÓN
    // --------------------------------------------------

    const nuevaSolicitud = await solicitudRepository.createSolicitud({
        usuarioId,
        mascotaId
    });

    return nuevaSolicitud;
};



// =======================================================
// OBTENER SOLICITUDES POR MASCOTA
// =======================================================

const getSolicitudesByMascota = async (mascotaId) => {

    if (!mascotaId) {
        const error = new Error("mascotaId es requerido");
        error.statusCode = 400;
        throw error;
    }

    const solicitudes = await solicitudRepository.getSolicitudesByMascota(mascotaId);

    return solicitudes;
};



// =======================================================
// OBTENER SOLICITUDES POR USUARIO
// =======================================================

const getSolicitudesByUsuario = async (usuarioId) => {

    if (!usuarioId) {
        const error = new Error("usuarioId es requerido");
        error.statusCode = 400;
        throw error;
    }

    const solicitudes = await solicitudRepository.getSolicitudesByUsuario(usuarioId);

    return solicitudes;
};



// =======================================================
// CAMBIAR ESTADO DE SOLICITUD
// =======================================================

const updateSolicitudEstado = async (id, estado) => {

    if (!id || !estado) {
        const error = new Error("ID y estado requeridos");
        error.statusCode = 400;
        throw error;
    }

    const solicitudActualizada = await solicitudRepository.updateSolicitudEstado(id, estado);

    if (!solicitudActualizada) {
        const error = new Error("Solicitud no encontrada");
        error.statusCode = 404;
        throw error;
    }

    return solicitudActualizada;
};



// =======================================================
// OBTENER TODAS LAS SOLICITUDES (ADMIN)
// =======================================================

const getAllSolicitudes = async () => {

    // Sin validaciones → protegido por middleware de roles
    const solicitudes = await solicitudRepository.getAllSolicitudes();

    return solicitudes;
};


// ------------------------------------------------------
// EXPORTAR SERVICE
// ------------------------------------------------------

module.exports = {
    createSolicitud,
    getSolicitudesByMascota,
    getSolicitudesByUsuario,
    updateSolicitudEstado,
    getAllSolicitudes
};