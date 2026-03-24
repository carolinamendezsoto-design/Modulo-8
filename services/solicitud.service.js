// ------------------------------------------------------
// IMPORTAR MODELOS
// ------------------------------------------------------

const { Solicitud, User } = require("../models");

// Importamos operadores de Sequelize
const { Op } = require("sequelize");


// ------------------------------------------------------
// CREAR SOLICITUD
// ------------------------------------------------------

const createSolicitud = async ({ usuarioId, mascotaId, mensaje }) => {

    // Validamos usuario
    if (!usuarioId) throw new Error("usuarioId requerido");

    // Validamos mascota
    if (!mascotaId) throw new Error("mascotaId requerido");

    // Creamos solicitud
    return await Solicitud.create({

        adoptanteId: usuarioId, // 🔥 clave correcta

        mascotaId,

        mensaje, // 🔥 ahora guardamos mensaje real

        estado: "pendiente"
    });
};


// ------------------------------------------------------
// OBTENER POSTULANTES
// ------------------------------------------------------

const getSolicitudesByMascota = async (mascotaId) => {

    return await Solicitud.findAll({

        where: { mascotaId },

        include: [
            {
                model: User,

                as: "adoptante", // 🔥 debe coincidir con models/index

                attributes: ["id", "nombre", "email"]
            }
        ]
    });
};


// ------------------------------------------------------
// APROBAR Y RECHAZAR OTROS
// ------------------------------------------------------

const updateSolicitudEstado = async (id, estado) => {

    // Buscamos solicitud
    const solicitud = await Solicitud.findByPk(id);

    if (!solicitud) throw new Error("Solicitud no encontrada");

    // Actualizamos estado
    solicitud.estado = estado;

    await solicitud.save();

    // Si se aprueba
    if (estado === "aprobado") {

        // Rechazamos las demás
        await Solicitud.update(
            { estado: "rechazado" },
            {
                where: {
                    mascotaId: solicitud.mascotaId,
                    id: { [Op.ne]: id }
                }
            }
        );
    }

    return solicitud;
};


// ------------------------------------------------------
// EXPORTAR
// ------------------------------------------------------

module.exports = {
    createSolicitud,
    getSolicitudesByMascota,
    updateSolicitudEstado
};