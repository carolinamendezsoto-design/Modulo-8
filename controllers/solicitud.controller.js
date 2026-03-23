// ------------------------------------------------------
// IMPORTAR SERVICES
// ------------------------------------------------------

// Service de solicitudes (contiene lógica de negocio)
const solicitudService = require("../services/solicitud.service");

// Service de mascotas (para actualizar estado en adopción)
const mascotaService = require("../services/mascota.service");


// ======================================================
// CREAR SOLICITUD
// ======================================================

const createSolicitud = async (req, res, next) => {

    try {

        // --------------------------------------------------
        // EXTRAER DATOS DEL REQUEST
        // --------------------------------------------------

        // Obtenemos el ID de la mascota desde el body
        const { mascotaId } = req.body;

        // Obtenemos el usuario autenticado desde el middleware JWT
        const usuarioId = req.user.id;

        // --------------------------------------------------
        // LLAMAR AL SERVICE
        // --------------------------------------------------

        // Enviamos datos al service (NO lógica aquí)
        const nuevaSolicitud = await solicitudService.createSolicitud({
            usuarioId,
            mascotaId
        });

        // --------------------------------------------------
        // RESPUESTA ESTÁNDAR API
        // --------------------------------------------------

        return res.status(201).json({
            status: "success",
            message: "Solicitud creada correctamente",
            data: nuevaSolicitud
        });

    } catch (error) {

        // Delegamos el manejo de errores al middleware global
        next(error);
    }
};



// ======================================================
// OBTENER SOLICITUDES POR MASCOTA
// ======================================================

const getSolicitudesByMascota = async (req, res, next) => {

    try {

        // Extraemos ID de la mascota desde params
        const { mascotaId } = req.params;

        // Llamamos al service
        const solicitudes = await solicitudService.getSolicitudesByMascota(mascotaId);

        // Respondemos con estructura estándar
        return res.status(200).json({
            status: "success",
            message: "Solicitudes obtenidas correctamente",
            data: solicitudes
        });

    } catch (error) {

        next(error);
    }
};



// ======================================================
// OBTENER MIS SOLICITUDES (ADOPTANTE)
// ======================================================

const getMisSolicitudes = async (req, res, next) => {

    try {

        // ID del usuario autenticado
        const usuarioId = req.user.id;

        // Consultamos sus solicitudes
        const solicitudes = await solicitudService.getSolicitudesByUsuario(usuarioId);

        return res.status(200).json({
            status: "success",
            message: "Mis solicitudes obtenidas correctamente",
            data: solicitudes
        });

    } catch (error) {

        next(error);
    }
};



// ======================================================
// SELECCIONAR ADOPTANTE (FLUJO FINAL DE ADOPCIÓN)
// ======================================================

const seleccionarAdoptante = async (req, res, next) => {

    try {

        // ID de la solicitud a aprobar
        const { id } = req.params;

        // --------------------------------------------------
        // 1. APROBAR SOLICITUD
        // --------------------------------------------------

        const solicitudAprobada = await solicitudService.updateSolicitudEstado(
            id,
            "aprobado"
        );

        // --------------------------------------------------
        // 2. CAMBIAR ESTADO DE LA MASCOTA
        // --------------------------------------------------

        await mascotaService.cambiarEstadoMascota({
            id: solicitudAprobada.mascotaId,
            estado: "adoptado"
        });

        // --------------------------------------------------
        // RESPUESTA FINAL
        // --------------------------------------------------

        return res.status(200).json({
            status: "success",
            message: "Adopción completada correctamente",
            data: solicitudAprobada
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

        // ID de la solicitud
        const { id } = req.params;

        // Actualizamos estado a rechazado
        const solicitudRechazada = await solicitudService.updateSolicitudEstado(
            id,
            "rechazado"
        );

        return res.status(200).json({
            status: "success",
            message: "Solicitud rechazada correctamente",
            data: solicitudRechazada
        });

    } catch (error) {

        next(error);
    }
};



// ======================================================
// OBTENER TODAS LAS SOLICITUDES (ADMIN)
// ======================================================

const getAllSolicitudes = async (req, res, next) => {

    try {

        // Llamamos al service
        const solicitudes = await solicitudService.getAllSolicitudes();

        return res.status(200).json({
            status: "success",
            message: "Todas las solicitudes obtenidas correctamente",
            data: solicitudes
        });

    } catch (error) {

        next(error);
    }
};


// ------------------------------------------------------
// EXPORTAR CONTROLADORES
// ------------------------------------------------------

module.exports = {
    createSolicitud,
    getSolicitudesByMascota,
    getMisSolicitudes,
    seleccionarAdoptante,
    rechazarSolicitud,
    getAllSolicitudes
};