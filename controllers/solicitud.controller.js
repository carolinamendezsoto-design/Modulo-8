// ------------------------------------------------------
// IMPORTAR SERVICES
// ------------------------------------------------------

// Service de solicitudes (lógica principal)
const solicitudService = require("../services/solicitud.service");

// Service de mascotas (para cambiar estado)
const mascotaService = require("../services/mascota.service");

// 🔥 NUEVO: service de notificaciones
const notificacionService = require("../services/notificacion.service");


// ------------------------------------------------------
// CREAR SOLICITUD
// ------------------------------------------------------

const createSolicitud = async (req, res, next) => {

    try {

        // Extraemos datos del body
        const { mascotaId, mensaje } = req.body;

        // Obtenemos usuario desde token
        const usuarioId = req.user.id;

        // 🔥 VALIDACIÓN DE ROL
        if (req.user.rol !== "adoptante") {

            return res.status(403).json({
                status: "error",
                message: "Solo adoptantes pueden postular"
            });
        }

        // Creamos solicitud en DB
        const nuevaSolicitud = await solicitudService.createSolicitud({
            usuarioId,
            mascotaId,
            mensaje
        });

        // 🔥 OBTENER MASCOTA PARA NOTIFICAR AL RESCATISTA
        const mascota = await mascotaService.getMascotaById({ id: mascotaId });
        
        if (mascota && mascota.userId) {
            await notificacionService.crearNotificacion(
                mascota.userId,
                `🐾 ¡Alguien ha postulado para adoptar a ${mascota.nombre}!`
            );
        }

        // 🔥 NOTIFICACIÓN AL USUARIO
        await notificacionService.crearNotificacion(
            usuarioId,
            "🐾 Has postulado a una mascota exitosamente"
        );

        // Respuesta
        res.status(201).json({
            status: "success",
            data: nuevaSolicitud
        });

    } catch (error) {

        next(error);
    }
};


// ------------------------------------------------------
// OBTENER POSTULANTES
// ------------------------------------------------------

const getSolicitudesByMascota = async (req, res, next) => {

    try {

        // ID de mascota
        const { id } = req.params;

        // Buscamos postulantes
        const solicitudes = await solicitudService.getSolicitudesByMascota(id);

        res.status(200).json({
            status: "success",
            data: solicitudes
        });

    } catch (error) {

        next(error);
    }
};


// ------------------------------------------------------
// SELECCIONAR ADOPTANTE
// ------------------------------------------------------

const seleccionarAdoptante = async (req, res, next) => {

    try {

        // ID de solicitud
        const { id } = req.params;

        // 1. aprobamos solicitud
        const solicitud = await solicitudService.updateSolicitudEstado(id, "aprobado");

        // 2. cambiamos estado mascota
        await mascotaService.updateEstado(solicitud.mascotaId, "adoptado");

        // 🔥 NOTIFICAMOS AL ADOPTANTE
        await notificacionService.crearNotificacion(
            solicitud.adoptanteId,
            "🎉 Fuiste seleccionado para adoptar una mascota"
        );

        res.status(200).json({
            status: "success",
            message: "Adopción completada"
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
    seleccionarAdoptante
};