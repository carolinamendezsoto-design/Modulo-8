// ------------------------------------------------------
// IMPORTAR SERVICE
// ------------------------------------------------------

// Importamos la capa de lógica de negocio (service)
// Aquí vive TODA la lógica, el controller solo coordina
const mascotaService = require("../services/mascota.service");


// =======================================================
// OBTENER TODAS LAS MASCOTAS
// =======================================================

const getMascotas = async (req, res) => {

    try {

        // --------------------------------------------------
        // LLAMAR SERVICE CON QUERY PARAMS
        // --------------------------------------------------

        // Pasamos filtros desde la URL (?estado=disponible, etc.)
        const mascotas = await mascotaService.getMascotas(req.query);

        // --------------------------------------------------
        // RESPUESTA EXITOSA (FORMATO ESTÁNDAR)
        // --------------------------------------------------

        res.status(200).json({
            status: "success",
            message: "Mascotas obtenidas correctamente",
            data: mascotas
        });

    } catch (error) {

        // --------------------------------------------------
        // MANEJO DE ERROR CENTRALIZADO
        // --------------------------------------------------

        res.status(error.statusCode || 500).json({
            status: "error",
            message: error.message || "Error al obtener mascotas"
        });
    }
};



// =======================================================
// OBTENER MASCOTA POR ID
// =======================================================

const getMascotaById = async (req, res) => {

    try {

        // --------------------------------------------------
        // EXTRAER ID DESDE PARAMS
        // --------------------------------------------------

        const { id } = req.params;

        // Validación básica
        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "El id es obligatorio"
            });
        }

        // --------------------------------------------------
        // LLAMAR SERVICE
        // --------------------------------------------------

        const mascota = await mascotaService.getMascotaById({ id });

        // --------------------------------------------------
        // RESPUESTA
        // --------------------------------------------------

        res.status(200).json({
            status: "success",
            message: "Mascota obtenida correctamente",
            data: mascota
        });

    } catch (error) {

        res.status(error.statusCode || 500).json({
            status: "error",
            message: error.message || "Error al obtener mascota"
        });
    }
};



// =======================================================
// CREAR MASCOTA
// =======================================================

const createMascota = async (req, res) => {

    try {

        // --------------------------------------------------
        // EXTRAER DATA DEL BODY
        // --------------------------------------------------

        const data = req.body;

        // Validación mínima (puedes mejorarla después)
        if (!data.nombre || !data.tipo) {
            return res.status(400).json({
                status: "error",
                message: "Nombre y tipo son obligatorios"
            });
        }

        // --------------------------------------------------
        // AGREGAR USER ID (DESDE TOKEN)
        // --------------------------------------------------

        // El middleware auth ya inyecta req.user
        data.userId = req.user.id;

        // --------------------------------------------------
        // AGREGAR IMAGEN SI EXISTE
        // --------------------------------------------------

        if (req.file) {
            data.imagen = req.file.filename;
        }

        // --------------------------------------------------
        // LLAMAR SERVICE
        // --------------------------------------------------

        const mascota = await mascotaService.createMascota(data);

        // --------------------------------------------------
        // RESPUESTA
        // --------------------------------------------------

        res.status(201).json({
            status: "success",
            message: "Mascota creada correctamente",
            data: mascota
        });

    } catch (error) {

        res.status(error.statusCode || 500).json({
            status: "error",
            message: error.message || "Error al crear mascota"
        });
    }
};



// =======================================================
// ACTUALIZAR MASCOTA
// =======================================================

const updateMascota = async (req, res) => {

    try {

        // --------------------------------------------------
        // EXTRAER ID Y DATA
        // --------------------------------------------------

        const { id } = req.params;
        const data = req.body;

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "El id es obligatorio"
            });
        }

        // --------------------------------------------------
        // AGREGAR IMAGEN SI VIENE NUEVA
        // --------------------------------------------------

        if (req.file) {
            data.imagen = req.file.filename;
        }

        // --------------------------------------------------
        // LLAMAR SERVICE
        // --------------------------------------------------

        const mascota = await mascotaService.updateMascota({ id, data });

        // --------------------------------------------------
        // RESPUESTA
        // --------------------------------------------------

        res.status(200).json({
            status: "success",
            message: "Mascota actualizada correctamente",
            data: mascota
        });

    } catch (error) {

        res.status(error.statusCode || 500).json({
            status: "error",
            message: error.message || "Error al actualizar mascota"
        });
    }
};



// =======================================================
// ELIMINAR MASCOTA
// =======================================================

const deleteMascota = async (req, res) => {

    try {

        // --------------------------------------------------
        // EXTRAER ID
        // --------------------------------------------------

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "El id es obligatorio"
            });
        }

        // --------------------------------------------------
        // LLAMAR SERVICE
        // --------------------------------------------------

        await mascotaService.deleteMascota({ id });

        // --------------------------------------------------
        // RESPUESTA
        // --------------------------------------------------

        res.status(200).json({
            status: "success",
            message: "Mascota eliminada correctamente"
        });

    } catch (error) {

        res.status(error.statusCode || 500).json({
            status: "error",
            message: error.message || "Error al eliminar mascota"
        });
    }
};



// =======================================================
// MATCH DE MASCOTAS
// =======================================================

const getMatchMascotas = async (req, res) => {

    try {

        // --------------------------------------------------
        // LLAMAR SERVICE CON PREFERENCIAS
        // --------------------------------------------------

        const mascotas = await mascotaService.getMatchMascotas(req.query);

        // --------------------------------------------------
        // RESPUESTA
        // --------------------------------------------------

        res.status(200).json({
            status: "success",
            message: "Match de mascotas obtenido correctamente",
            data: mascotas
        });

    } catch (error) {

        res.status(error.statusCode || 500).json({
            status: "error",
            message: error.message || "Error en match de mascotas"
        });
    }
};



// =======================================================
// CAMBIAR ESTADO (ADOPCIÓN)
// =======================================================

const cambiarEstadoMascota = async (req, res) => {

    try {

        // --------------------------------------------------
        // EXTRAER DATOS
        // --------------------------------------------------

        const { id } = req.params;
        const { estado } = req.body;

        if (!id || !estado) {
            return res.status(400).json({
                status: "error",
                message: "Id y estado son obligatorios"
            });
        }

        // --------------------------------------------------
        // LLAMAR SERVICE
        // --------------------------------------------------

        const mascota = await mascotaService.cambiarEstadoMascota({
            id,
            estado
        });

        // --------------------------------------------------
        // RESPUESTA
        // --------------------------------------------------

        res.status(200).json({
            status: "success",
            message: "Estado actualizado correctamente",
            data: mascota
        });

    } catch (error) {

        res.status(error.statusCode || 500).json({
            status: "error",
            message: error.message || "Error al cambiar estado"
        });
    }
};



// ------------------------------------------------------
// EXPORTAR CONTROLLER
// ------------------------------------------------------

module.exports = {
    getMascotas,
    getMascotaById,
    createMascota,
    updateMascota,
    deleteMascota,
    getMatchMascotas,
    cambiarEstadoMascota
};