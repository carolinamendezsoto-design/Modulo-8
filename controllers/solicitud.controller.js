// ------------------------------------------------------
// IMPORTAR SERVICES
// ------------------------------------------------------

// Service de solicitudes (lógica de negocio)
const solicitudService = require("../services/solicitud.service");

// Service de mascotas (para flujo de adopción)
const mascotaService = require("../services/mascota.service");


// ======================================================
// CREAR SOLICITUD
// ======================================================

const createSolicitud = async (req, res, next) => {

    try {

        // --------------------------------------------------
        // EXTRAER DATOS
        // --------------------------------------------------

        const { mascotaId } = req.body;

        // Usuario autenticado (desde middleware auth)
        const adoptanteId = req.user.id;

        // --------------------------------------------------
        // LLAMAR SERVICE
        // --------------------------------------------------

        const result = await solicitudService.createSolicitud({
            adoptanteId,
            mascotaId
        });

        // --------------------------------------------------
        // RESPUESTA
        // --------------------------------------------------

        return res.status(201).json({
            status: "success",
            message: "Solicitud creada correctamente",
            data: result
        });

    } catch (error) {

        // Pasamos error al middleware global
        next(error);
    }
};



// ======================================================
// OBTENER SOLICITUDES POR MASCOTA
// ======================================================

const getSolicitudesByMascota = async (req, res, next) => {

    try {

        const { mascotaId } = req.params;

        const result = await solicitudService.getSolicitudesByMascota(mascotaId);

        return res.status(200).json({
            status: "success",
            message: "Solicitudes obtenidas correctamente",
            data: result
        });

    } catch (error) {

        next(error);
    }
};



// ======================================================
// MIS SOLICITUDES
// ======================================================

const getMisSolicitudes = async (req, res, next) => {

    try {

        const adoptanteId = req.user.id;

        const result = await solicitudService.getSolicitudesByUsuario(adoptanteId);

        return res.status(200).json({
            status: "success",
            message: "Mis solicitudes obtenidas correctamente",
            data: result
        });

    } catch (error) {

        next(error);
    }
};



// ======================================================
// SELECCIONAR ADOPTANTE (🔥 FLUJO FINAL)
// ======================================================

const seleccionarAdoptante = async (req, res, next) => {

    try {

        const { id } = req.params;

        // --------------------------------------------------
        // APROBAR SOLICITUD
        // --------------------------------------------------

        const solicitud = await solicitudService.updateSolicitudEstado(
            id,
            "aprobado"
        );

        // --------------------------------------------------
        // CAMBIAR ESTADO DE MASCOTA
        // --------------------------------------------------

        await mascotaService.cambiarEstadoMascota({
            id: solicitud.mascotaId,
            estado: "adoptado"
        });

        return res.status(200).json({
            status: "success",
            message: "Adopción completada correctamente",
            data: solicitud
        });

    } catch (error) {

        next(error);
    }
};



// ======================================================
// RECHAZAR SOLICITUD
// ======================================================

const rechazarSolicitud = async (req, res, next) => {

    try {

        const { id } = req.params;

        const solicitud = await solicitudService.updateSolicitudEstado(
            id,
            "rechazado"
        );

        return res.status(200).json({
            status: "success",
            message: "Solicitud rechazada",
            data: solicitud
        });

    } catch (error) {

        next(error);
    }
};



// ======================================================
// ADMIN → TODAS
// ======================================================

const getAllSolicitudes = async (req, res, next) => {

    try {

        const result = await solicitudService.getAllSolicitudes();

        return res.status(200).json({
            status: "success",
            message: "Todas las solicitudes obtenidas",
            data: result
        });

    } catch (error) {

        next(error);
    }
};


// ------------------------------------------------------
// EXPORTAR
// ------------------------------------------------------

module.exports = {
    createSolicitud,
    getSolicitudesByMascota,
    getMisSolicitudes,
    seleccionarAdoptante,
    rechazarSolicitud,
    getAllSolicitudes
};