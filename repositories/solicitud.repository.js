// ------------------------------------------------------
// IMPORTAR MODELOS
// ------------------------------------------------------

// Importamos desde index (MEJOR PRÁCTICA)
const { Solicitud, User, Mascota } = require("../models");


// =======================================================
// CREAR SOLICITUD (POSTULAR A UNA MASCOTA)
// =======================================================

const createSolicitud = async (data) => {

    // --------------------------------------------------
    // VALIDAR DUPLICADO (🔥 MUY IMPORTANTE)
    // --------------------------------------------------

    // Buscamos si ya existe una solicitud del mismo usuario
    // para la misma mascota
    const existe = await Solicitud.findOne({
        where: {
            usuarioId: data.usuarioId,
            mascotaId: data.mascotaId
        }
    });

    // Si ya existe, no permitimos duplicados
    if (existe) {
        throw new Error("Ya postulaste a esta mascota");
    }

    // --------------------------------------------------
    // CREAR SOLICITUD
    // --------------------------------------------------

    // Creamos la solicitud con estado por defecto (pendiente)
    return await Solicitud.create({
        ...data,
        estado: "pendiente"
    });

};


// =======================================================
// OBTENER SOLICITUDES POR MASCOTA (POSTULANTES)
// =======================================================

const getSolicitudesByMascota = async (mascotaId) => {

    return await Solicitud.findAll({

        // Filtramos por mascota
        where: { mascotaId },

        // Incluimos información del usuario postulante
        include: [
            {
                model: User,
                as: "usuario",
                attributes: ["id", "nombre", "email", "telefono"]
            }
        ]

    });

};


// =======================================================
// OBTENER SOLICITUDES DE UN USUARIO
// =======================================================

const getSolicitudesByUsuario = async (usuarioId) => {

    return await Solicitud.findAll({

        // Filtramos por usuario
        where: { usuarioId },

        // Incluimos datos de la mascota
        include: [
            {
                model: Mascota,
                as: "mascota",
                attributes: ["id", "nombre", "edad", "estado"]
            }
        ]

    });

};


// =======================================================
// CAMBIAR ESTADO DE SOLICITUD
// =======================================================

const updateSolicitudEstado = async (id, estado) => {

    // Actualizamos estado (aprobada / rechazada)
    const [updated] = await Solicitud.update(
        { estado },
        { where: { id } }
    );

    // Si no se actualizó nada
    if (!updated) return null;

    // Retornamos solicitud actualizada
    return await Solicitud.findByPk(id);

};


// =======================================================
// ELIMINAR SOLICITUD (OPCIONAL)
// =======================================================

const deleteSolicitud = async (id) => {

    const deleted = await Solicitud.destroy({
        where: { id }
    });

    return deleted > 0;

};


// =======================================================
// OBTENER TODAS LAS SOLICITUDES (ADMIN)
// =======================================================

const getAllSolicitudes = async () => {

    return await Solicitud.findAll({

        include: [
            {
                model: User,
                as: "usuario",
                attributes: ["id", "nombre", "email"]
            },
            {
                model: Mascota,
                as: "mascota",
                attributes: ["id", "nombre", "estado"]
            }
        ]

    });

};


// ------------------------------------------------------
// EXPORTAR
// ------------------------------------------------------

module.exports = {
    createSolicitud,
    getSolicitudesByMascota,
    getSolicitudesByUsuario,
    updateSolicitudEstado,
    deleteSolicitud,
    getAllSolicitudes
};