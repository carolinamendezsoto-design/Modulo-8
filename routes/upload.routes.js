// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

const express = require("express");
const router = express.Router();

// Importamos multer
const upload = require("../middlewares/upload.middleware");


// ------------------------------------------------------
// RUTA SUBIR ARCHIVO
// ------------------------------------------------------

// POST /api/upload
router.post("/", upload.single("imagen"), (req, res) => {

    // Si no viene archivo
    if (!req.file) {
        return res.status(400).json({
            status: "error",
            message: "No se subió ningún archivo"
        });
    }

    // Respuesta exitosa
    res.json({
        status: "success",
        message: "Archivo subido correctamente",
        data: {
            filename: req.file.filename,
            path: `/uploads/${req.file.filename}`
        }
    });
});


// ------------------------------------------------------

module.exports = router;