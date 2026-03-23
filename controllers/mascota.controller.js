// ------------------------------------------------------
// IMPORTAR SERVICE
// ------------------------------------------------------

// Importamos la lógica de negocio de mascotas
const mascotaService = require("../services/mascota.service");


// =======================================================
// OBTENER TODAS LAS MASCOTAS
// =======================================================

const getMascotas = async (req, res, next) => {

    try {

        // Llamamos al service pasando filtros (?estado=...)
        const mascotas = await mascotaService.getMascotas(req.query);

        // Respuesta estándar
        return res.status(200).json({
            status: "success",
            message: "Mascotas obtenidas correctamente",
            data: mascotas
        });

    } catch (error) {

        // Delegamos al middleware global
        next(error);
    }
};



// =======================================================
// OBTENER MASCOTA POR ID
// =======================================================

const getMascotaById = async (req, res, next) => {

    try {

        // Extraemos ID desde params
        const { id } = req.params;

        // Validación
        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "El id es obligatorio",
                data: null
            });
        }

        // Llamamos al service
        const mascota = await mascotaService.getMascotaById({ id });

        // Respuesta OK
        return res.status(200).json({
            status: "success",
            message: "Mascota obtenida correctamente",
            data: mascota
        });

    } catch (error) {
        next(error);
    }
};



// =======================================================
// CREAR MASCOTA (🔥 FIX IMPORTANTE)
// =======================================================

const createMascota = async (req, res, next) => {

    try {

        // Body de la request
        const data = req.body;

        // --------------------------------------------------
        // VALIDACIÓN CORREGIDA
        // --------------------------------------------------

        // ❌ antes: tipo (no existe en frontend)
        // ✅ ahora: nombre + raza (correcto)
        if (!data.nombre || !data.raza) {
            return res.status(400).json({
                status: "error",
                message: "Nombre y raza son obligatorios",
                data: null
            });
        }

        // --------------------------------------------------
        // USER AUTENTICADO
        // --------------------------------------------------

        data.userId = req.user.id; // sacamos id del token

        // --------------------------------------------------
        // IMAGEN (MULTER)
        // --------------------------------------------------

        if (req.file) {
            data.imagen = req.file.filename; // guardamos nombre archivo
        }

        // --------------------------------------------------
        // CREAR EN SERVICE
        // --------------------------------------------------

        const mascota = await mascotaService.createMascota(data);

        // --------------------------------------------------
        // RESPUESTA
        // --------------------------------------------------

        return res.status(201).json({
            status: "success",
            message: "Mascota creada correctamente",
            data: mascota
        });

    } catch (error) {
        next(error);
    }
};



// =======================================================
// ACTUALIZAR MASCOTA
// =======================================================

const updateMascota = async (req, res, next) => {

    try {

        const { id } = req.params; // id desde URL
        const data = req.body;     // datos nuevos

        // Validación
        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "El id es obligatorio",
                data: null
            });
        }

        // Imagen opcional
        if (req.file) {
            data.imagen = req.file.filename;
        }

        // Service
        const mascota = await mascotaService.updateMascota({ id, data });

        return res.status(200).json({
            status: "success",
            message: "Mascota actualizada correctamente",
            data: mascota
        });

    } catch (error) {
        next(error);
    }
};



// =======================================================
// ELIMINAR MASCOTA
// =======================================================

const deleteMascota = async (req, res, next) => {

    try {

        const { id } = req.params;

        // Validación
        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "El id es obligatorio",
                data: null
            });
        }

        // Eliminamos
        await mascotaService.deleteMascota({ id });

        return res.status(200).json({
            status: "success",
            message: "Mascota eliminada correctamente",
            data: null
        });

    } catch (error) {
        next(error);
    }
};



// =======================================================
// MATCH DE MASCOTAS
// =======================================================

const getMatchMascotas = async (req, res, next) => {

    try {

        // Llamamos service con preferencias
        const mascotas = await mascotaService.getMatchMascotas(req.query);

        return res.status(200).json({
            status: "success",
            message: "Match de mascotas obtenido correctamente",
            data: mascotas
        });

    } catch (error) {
        next(error);
    }
};



// =======================================================
// CAMBIAR ESTADO
// =======================================================

const cambiarEstadoMascota = async (req, res, next) => {

    try {

        const { id } = req.params;
        const { estado } = req.body;

        // Validación
        if (!id || !estado) {
            return res.status(400).json({
                status: "error",
                message: "Id y estado son obligatorios",
                data: null
            });
        }

        // Service
        const mascota = await mascotaService.cambiarEstadoMascota({
            id,
            estado
        });

        return res.status(200).json({
            status: "success",
            message: "Estado actualizado correctamente",
            data: mascota
        });

    } catch (error) {
        next(error);
    }
};


// EXPORT
module.exports = {
    getMascotas,
    getMascotaById,
    createMascota,
    updateMascota,
    deleteMascota,
    getMatchMascotas,
    cambiarEstadoMascota
};