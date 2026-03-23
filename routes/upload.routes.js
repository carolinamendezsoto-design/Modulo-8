// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos express para manejar rutas HTTP
const express = require("express");

// Creamos una instancia del router
const router = express.Router();


// ------------------------------------------------------
// IMPORTAR MIDDLEWARES
// ------------------------------------------------------

// Middleware de subida de archivos (multer)
const upload = require("../middlewares/upload.middleware");

// Middleware de autenticación (🔥 lo agregamos para seguridad)
const auth = require("../middlewares/auth.middleware");


// ------------------------------------------------------
// RUTA SUBIR ARCHIVO
// ------------------------------------------------------

// Endpoint: POST /api/upload
// Permite subir una imagen al servidor
router.post(
    "/",                         // ruta base
    auth,                        // 🔥 protegemos la ruta (solo usuarios logueados)
    upload.single("imagen"),     // multer procesa el archivo (campo "imagen")
    (req, res) => {

        // --------------------------------------------------
        // VALIDAR SI SE RECIBIÓ ARCHIVO
        // --------------------------------------------------

        // Si no se envió archivo en la request
        if (!req.file) {
            return res.status(400).json({
                status: "error",
                message: "No se subió ningún archivo"
            });
        }

        // --------------------------------------------------
        // RESPUESTA EXITOSA
        // --------------------------------------------------

        // Retornamos información del archivo subido
        res.json({
            status: "success",
            message: "Archivo subido correctamente",
            data: {
                filename: req.file.filename, // nombre guardado
                path: `/uploads/${req.file.filename}` // ruta pública
            }
        });
    }
);


// ------------------------------------------------------
// EXPORTAR ROUTER
// ------------------------------------------------------

// Exportamos el router para usarlo en index.js
module.exports = router;