// ------------------------------------------------------
// IMPORTAR REPOSITORY
// ------------------------------------------------------

// Capa de acceso a datos
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
    // CREAR (REPOSITORY YA VALIDA DUPLICADOS 🔥)
    // --------------------------------------------------

    return await solicitudRepository.createSolicitud({
        usuarioId,
        mascotaId
    });
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

    return await solicitudRepository.getSolicitudesByMascota(mascotaId);
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

    return await solicitudRepository.getSolicitudesByUsuario(usuarioId);
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

    const solicitud = await solicitudRepository.updateSolicitudEstado(id, estado);

    if (!solicitud) {
        const error = new Error("Solicitud no encontrada");
        error.statusCode = 404;
        throw error;
    }

    return solicitud;
};



// =======================================================
// OBTENER TODAS (ADMIN)
// =======================================================

const getAllSolicitudes = async () => {

    return await solicitudRepository.getAllSolicitudes();
};



// ------------------------------------------------------
// EXPORTAR
// ------------------------------------------------------

module.exports = {
    createSolicitud,
    getSolicitudesByMascota,
    getSolicitudesByUsuario,
    updateSolicitudEstado,
    getAllSolicitudes
};