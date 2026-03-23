// ------------------------------------------------------
// IMPORTAR SERVICE
// ------------------------------------------------------

// Importamos la capa de lógica de negocio
const mascotaService = require("../services/mascota.service");


// =======================================================
// OBTENER TODAS LAS MASCOTAS
// =======================================================

const getMascotas = async (req, res) => {

    try {

        // --------------------------------------------------
        // LLAMAR SERVICE CON QUERY PARAMS
        // --------------------------------------------------

        const mascotas = await mascotaService.getMascotas(req.query);

        // --------------------------------------------------
        // RESPUESTA EXITOSA
        // --------------------------------------------------

        res.status(200).json(mascotas);

    } catch (error) {

        // --------------------------------------------------
        // MANEJO DE ERROR
        // --------------------------------------------------

        res.status(error.statusCode || 500).json({
            message: error.message
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

        // --------------------------------------------------
        // LLAMAR SERVICE
        // --------------------------------------------------

        const mascota = await mascotaService.getMascotaById({ id });

        // --------------------------------------------------
        // RESPUESTA
        // --------------------------------------------------

        res.status(200).json(mascota);

    } catch (error) {

        res.status(error.statusCode || 500).json({
            message: error.message
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

        // --------------------------------------------------
        // AGREGAR USER ID (DESDE TOKEN)
        // --------------------------------------------------

        data.userId = req.user.id; // 🔥 clave (auth middleware)

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

        res.status(201).json(mascota);

    } catch (error) {

        res.status(error.statusCode || 500).json({
            message: error.message
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

        res.status(200).json(mascota);

    } catch (error) {

        res.status(error.statusCode || 500).json({
            message: error.message
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

        // --------------------------------------------------
        // LLAMAR SERVICE
        // --------------------------------------------------

        const result = await mascotaService.deleteMascota({ id });

        // --------------------------------------------------
        // RESPUESTA
        // --------------------------------------------------

        res.status(200).json(result);

    } catch (error) {

        res.status(error.statusCode || 500).json({
            message: error.message
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

        res.status(200).json(mascotas);

    } catch (error) {

        res.status(error.statusCode || 500).json({
            message: error.message
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

        res.status(200).json(mascota);

    } catch (error) {

        res.status(error.statusCode || 500).json({
            message: error.message
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