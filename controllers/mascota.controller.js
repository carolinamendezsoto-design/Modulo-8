// ------------------------------------------------------
// IMPORTAR SERVICE
// ------------------------------------------------------

// Importamos el servicio de mascotas
// Aquí está la lógica de negocio (intermediario con repository)
const mascotaService = require("../services/mascota.service");


// ------------------------------------------------------
// OBTENER TODAS LAS MASCOTAS
// ------------------------------------------------------

const getMascotas = async (req, res, next) => {
    try {

        // Llamamos al service pasando posibles filtros (query params)
        const result = await mascotaService.getMascotas(req.query);

        // Respondemos con formato estándar
        res.status(200).json({
            status: "success",
            message: "Mascotas obtenidas correctamente",
            data: result
        });

    } catch (error) {
        next(error);
    }
};


// ------------------------------------------------------
// OBTENER MASCOTA POR ID
// ------------------------------------------------------

const getMascotaById = async (req, res, next) => {
    try {

        // Enviamos los parámetros (id) al service
        const result = await mascotaService.getMascotaById(req.params);

        res.status(200).json({
            status: "success",
            message: "Mascota obtenida correctamente",
            data: result
        });

    } catch (error) {
        next(error);
    }
};


// ------------------------------------------------------
// CREAR MASCOTA
// ------------------------------------------------------

const createMascota = async (req, res, next) => {
    try {

        // ---------------- VALIDACIONES ----------------

        if (!req.body.nombre) {
            return res.status(400).json({
                status: "error",
                message: "El nombre es obligatorio",
                data: null
            });
        }

        if (!req.body.edad) {
            return res.status(400).json({
                status: "error",
                message: "La edad es obligatoria",
                data: null
            });
        }

        if (!req.body.descripcion || req.body.descripcion.length < 10) {
            return res.status(400).json({
                status: "error",
                message: "La descripción debe tener al menos 10 caracteres",
                data: null
            });
        }

        // ---------------- DATOS ----------------

        const data = {
            nombre: req.body.nombre,
            edad: req.body.edad,
            porte: req.body.porte,
            energia: req.body.energia,
            descripcion: req.body.descripcion,
            estado: "disponible",
            userId: req.user.id,
            imagen: req.file ? req.file.filename : null
        };

        const result = await mascotaService.createMascota(data);

        res.status(201).json({
            status: "success",
            message: "Mascota creada correctamente",
            data: result
        });

    } catch (error) {
        next(error);
    }
};


// ------------------------------------------------------
// ACTUALIZAR MASCOTA
// ------------------------------------------------------

const updateMascota = async (req, res, next) => {
    try {

        const data = {
            ...req.body,
            ...(req.file && { imagen: req.file.filename })
        };

        const result = await mascotaService.updateMascota({
            id: req.params.id,
            data
        });

        res.status(200).json({
            status: "success",
            message: "Mascota actualizada correctamente",
            data: result
        });

    } catch (error) {
        next(error);
    }
};


// ------------------------------------------------------
// ELIMINAR MASCOTA
// ------------------------------------------------------

const deleteMascota = async (req, res, next) => {
    try {

        const result = await mascotaService.deleteMascota(req.params);

        res.status(200).json({
            status: "success",
            message: "Mascota eliminada correctamente",
            data: result
        });

    } catch (error) {
        next(error);
    }
};


// =======================================================
// 🔥 MATCH DE MASCOTAS (NUEVO - NIVEL PRO)
// =======================================================

const getMatchMascotas = async (req, res, next) => {
    try {

        // --------------------------------------------------
        // OBTENER PREFERENCIAS DESDE QUERY
        // --------------------------------------------------

        // Ejemplo:
        // /match?energia=Media&porte=Pequeña
        const preferencias = {
            energia: req.query.energia,
            porte: req.query.porte
        };

        // --------------------------------------------------
        // LLAMAR AL SERVICE
        // --------------------------------------------------

        const result = await mascotaService.getMatchMascotas(preferencias);

        // --------------------------------------------------
        // RESPUESTA
        // --------------------------------------------------

        res.status(200).json({
            status: "success",
            message: "Match de mascotas calculado correctamente",
            data: result
        });

    } catch (error) {
        next(error);
    }
};


// ------------------------------------------------------
// EXPORTAR CONTROLADOR
// ------------------------------------------------------

module.exports = {
    getMascotas,
    getMascotaById,
    createMascota,
    updateMascota,
    deleteMascota,
    getMatchMascotas // 👈 NUEVO
};