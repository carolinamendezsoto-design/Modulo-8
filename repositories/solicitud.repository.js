// ------------------------------------------------------
// IMPORTAR MODELOS
// ------------------------------------------------------

// Importamos desde index (relaciones incluidas)
const { Solicitud, User, Mascota } = require("../models");


// =======================================================
// CREAR SOLICITUD
// =======================================================

const createSolicitud = async (data) => {

    // --------------------------------------------------
    // VALIDACIÓN
    // --------------------------------------------------

    if (!data.adoptanteId || !data.mascotaId) {
        throw new Error("adoptanteId y mascotaId son requeridos");
    }

    // --------------------------------------------------
    // VALIDAR DUPLICADO (🔥 CLAVE)
    // --------------------------------------------------

    const existe = await Solicitud.findOne({
        where: {
            adoptanteId: data.adoptanteId,
            mascotaId: data.mascotaId
        }
    });

    if (existe) {
        throw new Error("Ya postulaste a esta mascota");
    }

    // --------------------------------------------------
    // CREAR SOLICITUD
    // --------------------------------------------------

    return await Solicitud.create({
        ...data,
        estado: "pendiente"
    });
};



// =======================================================
// OBTENER SOLICITUDES POR MASCOTA
// =======================================================

const getSolicitudesByMascota = async (mascotaId) => {

    if (!mascotaId) {
        throw new Error("mascotaId es requerido");
    }

    return await Solicitud.findAll({

        where: { mascotaId },

        include: [
            {
                model: User,
                as: "usuario", // ⚠️ debe coincidir con relación
                attributes: ["id", "nombre", "email", "telefono"]
            }
        ],

        order: [["createdAt", "DESC"]] // 🔥 mejora pro
    });
};



// =======================================================
// OBTENER SOLICITUDES DE UN USUARIO
// =======================================================

const getSolicitudesByUsuario = async (adoptanteId) => {

    if (!adoptanteId) {
        throw new Error("adoptanteId es requerido");
    }

    return await Solicitud.findAll({

        where: { adoptanteId },

        include: [
            {
                model: Mascota,
                as: "mascota",
                attributes: ["id", "nombre", "edad", "estado"]
            }
        ],

        order: [["createdAt", "DESC"]]
    });
};



// =======================================================
// CAMBIAR ESTADO DE SOLICITUD
// =======================================================

const updateSolicitudEstado = async (id, estado) => {

    if (!id || !estado) {
        throw new Error("ID y estado requeridos");
    }

    const [updated] = await Solicitud.update(
        { estado },
        { where: { id } }
    );

    if (!updated) return null;

    return await Solicitud.findByPk(id);
};



// =======================================================
// ELIMINAR SOLICITUD
// =======================================================

const deleteSolicitud = async (id) => {

    if (!id) {
        throw new Error("ID requerido");
    }

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
        ],

        order: [["createdAt", "DESC"]]
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