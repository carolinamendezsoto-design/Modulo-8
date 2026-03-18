// Importamos express para crear las rutas
const express = require("express");

// Creamos el router de Express
const router = express.Router();

// Importamos el middleware de subida de archivos
const upload = require("../middlewares/upload");

// Creamos el endpoint POST /upload
router.post(
  "/",

  // Middleware que procesa un solo archivo con el nombre "file"
  upload.single("file"),

  // Controlador de la ruta
  (req, res) => {
    try {

      // Respondemos con un JSON estructurado (formato profesional)
      res.json({
        status: "success",
        message: "Archivo subido correctamente",

        // Enviamos información del archivo subido
        data: {
          filename: req.file.filename, // nombre del archivo guardado
          path: req.file.path         // ruta donde quedó almacenado
        }
      });

    } catch (error) {

      // En caso de error, enviamos respuesta con estado 500
      res.status(500).json({
        status: "error",
        message: error.message
      });
    }
  }
);

// Exportamos el router para usarlo en index.js
module.exports = router;