// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Multer permite manejar subida de archivos
const multer = require("multer");

// Path ayuda a manejar rutas de archivos
const path = require("path");


// ------------------------------------------------------
// CONFIGURACIÓN DE ALMACENAMIENTO
// ------------------------------------------------------

const storage = multer.diskStorage({

    // Definimos dónde guardar los archivos
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // carpeta uploads
    },

    // Definimos el nombre del archivo
    filename: (req, file, cb) => {

        // Generamos nombre único con timestamp
        const uniqueName = Date.now() + path.extname(file.originalname);

        cb(null, uniqueName);
    }
});


// ------------------------------------------------------
// FILTRO DE ARCHIVOS (SEGURIDAD)
// ------------------------------------------------------

const fileFilter = (req, file, cb) => {

    // Tipos permitidos
    const allowedTypes = /jpg|jpeg|png/;

    // Validamos extensión
    const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());

    // Validamos tipo MIME
    const mime = allowedTypes.test(file.mimetype);

    if (ext && mime) {
        cb(null, true); // permitido
    } else {
        cb(new Error("Solo se permiten imágenes (jpg, jpeg, png)"));
    }
};


// ------------------------------------------------------
// CONFIGURACIÓN FINAL
// ------------------------------------------------------

const upload = multer({
    storage, // almacenamiento configurado
    limits: { fileSize: 5 * 1024 * 1024 }, // máximo 5MB
    fileFilter // filtro de seguridad
});


// ------------------------------------------------------
// EXPORTAR
// ------------------------------------------------------

module.exports = upload;