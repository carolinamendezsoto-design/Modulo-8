// ------------------------------------------------------
// IMPORTAR SERVICES
// ------------------------------------------------------

const solicitudService = require("../services/solicitud.service");
const mascotaService = require("../services/mascota.service");


// ======================================================
// CREAR SOLICITUD
// ======================================================

const createSolicitud = async (req, res, next) => {
    try {

        // Extraemos datos
        const { mascotaId } = req.body;

        // Usuario autenticado
        const usuarioId = req.user.id;
        const rol = req.user.rol;

        // Validamos mascotaId
        if (!mascotaId) {
            return res.status(400).json({
                status: "error",
                message: "mascotaId es obligatorio",
                data: null
            });
        }

        // Validamos rol
        if (rol !== "adoptante") {
            return res.status(403).json({
                status: "error",
                message: "Solo adoptantes pueden postular",
                data: null
            });
        }

        // Creamos solicitud
        const result = await solicitudService.createSolicitud({
            usuarioId,
            mascotaId
        });

        return res.status(201).json({
            status: "success",
            message: "Solicitud creada correctamente",
            data: result
        });

    } catch (error) {
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

        const usuarioId = req.user.id;

        const result = await solicitudService.getSolicitudesByUsuario(usuarioId);

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

        // Aprobamos solicitud
        const solicitud = await solicitudService.updateSolicitudEstado(id, "aprobada");

        // Cambiamos estado mascota
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

        const solicitud = await solicitudService.updateSolicitudEstado(id, "rechazada");

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