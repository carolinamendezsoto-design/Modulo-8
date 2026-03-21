const Solicitud = require("../models/solicitud");
const User = require("../models/user");
const Mascota = require("../models/mascota");
const { Op } = require("sequelize");


// ======================================================
// CREAR SOLICITUD
// ======================================================

exports.createSolicitud = async (req, res, next) => {
    try {

        const { mascotaId, mensaje } = req.body;
        const adoptanteId = req.user.id;
        const rol = req.user.rol;

        // Validar datos
        if (!mascotaId) {
            return res.status(400).json({
                status: "error",
                message: "El campo mascotaId es obligatorio"
            });
        }

        if (rol !== "adoptante") {
            return res.status(403).json({
                status: "error",
                message: "Solo adoptantes pueden solicitar"
            });
        }

        const mascota = await Mascota.findByPk(mascotaId);

        if (!mascota) {
            return res.status(404).json({
                status: "error",
                message: "Mascota no encontrada"
            });
        }

        if (mascota.estado !== "disponible") {
            return res.status(400).json({
                status: "error",
                message: "Mascota no disponible"
            });
        }

        // Evitar duplicados
        const existe = await Solicitud.findOne({
            where: { mascotaId, adoptanteId }
        });

        if (existe) {
            return res.status(400).json({
                status: "error",
                message: "Ya postulaste a esta mascota"
            });
        }

        const nuevaSolicitud = await Solicitud.create({
            mascotaId,
            adoptanteId,
            mensaje,
            estado: "pendiente"
        });

        res.status(201).json({
            status: "success",
            message: "Solicitud creada correctamente",
            data: nuevaSolicitud
        });

    } catch (error) {
        next(error);
    }
};


// ======================================================
// SELECCIONAR ADOPTANTE (LÓGICA FINAL)
// ======================================================

exports.seleccionarAdoptante = async (req, res, next) => {
    try {

        const { id } = req.params;
        const usuario = req.user;

        const solicitud = await Solicitud.findByPk(id);

        if (!solicitud) {
            return res.status(404).json({
                status: "error",
                message: "Solicitud no encontrada"
            });
        }

        const mascota = await Mascota.findByPk(solicitud.mascotaId);

        // 🔥 SOLO dueño o admin puede aprobar
        if (usuario.rol !== "admin" && mascota.userId !== usuario.id) {
            return res.status(403).json({
                status: "error",
                message: "No autorizado para aprobar"
            });
        }

        // Aprobar
        solicitud.estado = "aprobado";
        await solicitud.save();

        // Rechazar otras
        await Solicitud.update(
            { estado: "rechazado" },
            {
                where: {
                    mascotaId: solicitud.mascotaId,
                    id: { [Op.ne]: id }
                }
            }
        );

        // Marcar mascota adoptada
        await Mascota.update(
            { estado: "adoptado" },
            { where: { id: solicitud.mascotaId } }
        );

        res.json({
            status: "success",
            message: "Adopción completada",
            data: solicitud
        });

    } catch (error) {
        next(error);
    }
};