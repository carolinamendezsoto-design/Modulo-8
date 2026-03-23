// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Multer permite manejar subida de archivos en Express
const multer = require("multer");

// Path ayuda a manejar rutas y extensiones de archivos
const path = require("path");


// ------------------------------------------------------
// CONFIGURACIÓN DE ALMACENAMIENTO
// ------------------------------------------------------

// Definimos cómo y dónde se guardarán los archivos
const storage = multer.diskStorage({

    // Carpeta donde se guardan los archivos
    destination: (req, file, cb) => {

        // Indicamos la carpeta "uploads/"
        cb(null, "uploads/");
    },

    // Nombre del archivo
    filename: (req, file, cb) => {

        // Generamos un nombre único usando timestamp + extensión original
        const uniqueName = Date.now() + path.extname(file.originalname);

        // Guardamos el archivo con ese nombre
        cb(null, uniqueName);
    }
});


// ------------------------------------------------------
// FILTRO DE ARCHIVOS (SEGURIDAD)
// ------------------------------------------------------

// Función que valida tipo de archivo
const fileFilter = (req, file, cb) => {

    // Definimos tipos permitidos
    const allowedTypes = /jpg|jpeg|png/;

    // Validamos extensión del archivo (ej: .jpg)
    const ext = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    // Validamos tipo MIME (seguridad adicional)
    const mime = allowedTypes.test(file.mimetype);

    // Si cumple ambas validaciones
    if (ext && mime) {

        // Permitimos archivo
        cb(null, true);

    } else {

        // Rechazamos archivo con error
        cb(new Error("Solo se permiten imágenes (jpg, jpeg, png)"));
    }
};


// ------------------------------------------------------
// CONFIGURACIÓN FINAL DE MULTER
// ------------------------------------------------------

// Creamos instancia de multer con configuración completa
const upload = multer({

    storage, // configuración de almacenamiento

    limits: {
        fileSize: 5 * 1024 * 1024 // máximo 5MB
    },

    fileFilter // validación de tipo de archivo
});


// ------------------------------------------------------
// EXPORTAR MIDDLEWARE
// ------------------------------------------------------

// Exportamos para usar en rutas (ej: upload.single("imagen"))
module.exports = upload;