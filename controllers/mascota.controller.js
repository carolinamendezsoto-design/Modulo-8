// ------------------------------------------------------
// IMPORTAMOS SERVICE
// ------------------------------------------------------

const mascotaService = require("../services/mascota.service"); // lógica de negocio


// ------------------------------------------------------
// GET TODAS LAS MASCOTAS
// ------------------------------------------------------

exports.getMascotas = async (req, res) => { // controlador async

    try {

        const mascotas = await mascotaService.getMascotas(req.query); // pasamos filtros

        return res.status(200).json({
            ok: true,
            message: "Mascotas obtenidas correctamente",
            data: mascotas
        });

    } catch (error) {

        console.error(error);

        return res.status(error.statusCode || 500).json({
            ok: false,
            message: error.message || "Error al obtener mascotas"
        });
    }
};


// ------------------------------------------------------
// GET POR ID
// ------------------------------------------------------

exports.getMascotaById = async (req, res) => {

    try {

        const mascota = await mascotaService.getMascotaById({ id: req.params.id });

        return res.status(200).json({
            ok: true,
            data: mascota
        });

    } catch (error) {

        console.error(error);

        return res.status(error.statusCode || 500).json({
            ok: false,
            message: error.message
        });
    }
};


// ------------------------------------------------------
// CREAR MASCOTA
// ------------------------------------------------------

exports.createMascota = async (req, res) => {

    try {

        const data = req.body; // datos frontend

        // imagen subida
        if (req.file) {
            data.imagen = req.file.filename;
        }

        // usuario creador
        data.userId = req.user.id;

        const nueva = await mascotaService.createMascota(data);

        return res.status(201).json({
            ok: true,
            message: "Mascota creada",
            data: nueva
        });

    } catch (error) {

        console.error(error);

        return res.status(error.statusCode || 500).json({
            ok: false,
            message: error.message
        });
    }
};


// ------------------------------------------------------
// ACTUALIZAR
// ------------------------------------------------------

exports.updateMascota = async (req, res) => {

    try {

        const data = req.body;

        if (req.file) {
            data.imagen = req.file.filename;
        }

        const updated = await mascotaService.updateMascota({
            id: req.params.id,
            data
        });

        return res.status(200).json({
            ok: true,
            message: "Mascota actualizada",
            data: updated
        });

    } catch (error) {

        console.error(error);

        return res.status(error.statusCode || 500).json({
            ok: false,
            message: error.message
        });
    }
};


// ------------------------------------------------------
// ELIMINAR
// ------------------------------------------------------

exports.deleteMascota = async (req, res) => {

    try {

        const result = await mascotaService.deleteMascota({
            id: req.params.id
        });

        return res.status(200).json({
            ok: true,
            message: result.message
        });

    } catch (error) {

        console.error(error);

        return res.status(error.statusCode || 500).json({
            ok: false,
            message: error.message
        });
    }
};


// ------------------------------------------------------
// 🔥 CAMBIAR ESTADO (FIX CRÍTICO)
// ------------------------------------------------------

exports.cambiarEstadoMascota = async (req, res) => {

    try {

        const { id } = req.params; // id mascota
        const { estado } = req.body; // nuevo estado

        const mascota = await mascotaService.updateEstado(id, estado); // usamos service correcto

        return res.status(200).json({
            ok: true,
            message: "Estado actualizado",
            data: mascota
        });

    } catch (error) {

        console.error(error);

        return res.status(error.statusCode || 500).json({
            ok: false,
            message: error.message
        });
    }
};