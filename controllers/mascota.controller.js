// ------------------------------------------------------
// IMPORTAR SERVICE
// ------------------------------------------------------

// Importamos el servicio donde vive la lógica de negocio
const mascotaService = require("../services/mascota.service");


// ------------------------------------------------------
// OBTENER TODAS LAS MASCOTAS
// ------------------------------------------------------

const getMascotas = async (req, res, next) => {
    try {
        // Llamamos al service enviando filtros (query params)
        const result = await mascotaService.getMascotas(req.query);

        // Respuesta estándar API (como pide la consigna)
        res.status(200).json({
            status: "success",
            message: "Mascotas obtenidas correctamente",
            data: result
        });

    } catch (error) {
        next(error); // delegamos al middleware global
    }
};


// ------------------------------------------------------
// OBTENER MASCOTA POR ID
// ------------------------------------------------------

const getMascotaById = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Llamamos al service
        const result = await mascotaService.getMascotaById({ id });

        // Validación si no existe
        if (!result) {
            return res.status(404).json({
                status: "error",
                message: "Mascota no encontrada",
                data: null
            });
        }

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
                message: "El nombre es obligatorio"
            });
        }

        if (!req.body.edad) {
            return res.status(400).json({
                status: "error",
                message: "La edad es obligatoria"
            });
        }

        if (!req.body.descripcion || req.body.descripcion.length < 10) {
            return res.status(400).json({
                status: "error",
                message: "La descripción debe tener al menos 10 caracteres"
            });
        }

        // ---------------- DATOS ----------------

        const data = {
            nombre: req.body.nombre,
            edad: req.body.edad,
            porte: req.body.porte,
            energia: req.body.energia,
            descripcion: req.body.descripcion,
            estado: "disponible", // siempre inicia disponible
            userId: req.user.id, // usuario autenticado
            imagen: req.file ? req.file.filename : null
        };

        // Guardamos en DB
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

        const { id } = req.params;

        // Construimos objeto dinámico
        const data = {
            ...req.body,
            ...(req.file && { imagen: req.file.filename })
        };

        const result = await mascotaService.updateMascota({
            id,
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
        const { id } = req.params;

        const result = await mascotaService.deleteMascota({ id });

        res.status(200).json({
            status: "success",
            message: "Mascota eliminada correctamente",
            data: result
        });

    } catch (error) {
        next(error);
    }
};


// ------------------------------------------------------
// MATCH DE MASCOTAS
// ------------------------------------------------------

const getMatchMascotas = async (req, res, next) => {
    try {

        // Preferencias desde query
        const preferencias = {
            energia: req.query.energia,
            porte: req.query.porte
        };

        const result = await mascotaService.getMatchMascotas(preferencias);

        res.status(200).json({
            status: "success",
            message: "Match calculado correctamente",
            data: result
        });

    } catch (error) {
        next(error);
    }
};


// Exportamos todo
module.exports = {
    getMascotas,
    getMascotaById,
    createMascota,
    updateMascota,
    deleteMascota,
    getMatchMascotas
};