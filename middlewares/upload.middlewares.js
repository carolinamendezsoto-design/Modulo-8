// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Multer permite manejar subida de archivos en Express
const multer = require("multer");

// Path ayuda a manejar rutas y extensiones de archivos
const path = require("path");

// File system para validar/crear carpeta uploads
const fs = require("fs");


// ------------------------------------------------------
// ASEGURAR QUE EXISTE LA CARPETA UPLOADS
// ------------------------------------------------------

// Definimos la ruta de la carpeta uploads
const uploadDir = path.join(__dirname, "..", "uploads");

// Si la carpeta no existe, la creamos automáticamente
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}


// ------------------------------------------------------
// CONFIGURACIÓN DE ALMACENAMIENTO
// ------------------------------------------------------

// Definimos cómo y dónde se guardarán los archivos
const storage = multer.diskStorage({

    // Carpeta donde se guardan los archivos
    destination: (req, file, cb) => {

        // Guardamos en la carpeta uploads (ruta absoluta para evitar errores)
        cb(null, uploadDir);
    },

    // Nombre del archivo
    filename: (req, file, cb) => {

        // Sanitizamos el nombre original (evita espacios raros)
        const safeName = file.originalname
            .replace(/\s+/g, "_") // reemplaza espacios por _
            .toLowerCase();

        // Generamos nombre único: timestamp + nombre limpio
        const uniqueName = `${Date.now()}-${safeName}`;

        // Guardamos el archivo con ese nombre
        cb(null, uniqueName);
    }
});


// ------------------------------------------------------
// FILTRO DE ARCHIVOS (SEGURIDAD)
// ------------------------------------------------------

// Función que valida tipo de archivo
const fileFilter = (req, file, cb) => {

    // Tipos MIME permitidos (más seguro que regex simple)
    const allowedMimeTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp"
    ];

    // Validamos si el tipo del archivo está permitido
    if (allowedMimeTypes.includes(file.mimetype)) {

        // Permitimos el archivo
        cb(null, true);

    } else {

        // Rechazamos archivo con error claro
        cb(new Error("Tipo de archivo no permitido. Solo imágenes (jpg, jpeg, png, webp)"));
    }
};


// ------------------------------------------------------
// CONFIGURACIÓN FINAL DE MULTER
// ------------------------------------------------------

// Creamos instancia de multer con configuración completa
const upload = multer({

    // Configuración de almacenamiento
    storage,

    // Límite de tamaño del archivo (5MB)
    limits: {
        fileSize: 5 * 1024 * 1024
    },

    // Validación de tipo de archivo
    fileFilter
});


// ------------------------------------------------------
// MIDDLEWARE DE MANEJO DE ERRORES DE MULTER
// ------------------------------------------------------

// Este middleware captura errores específicos de multer
const handleMulterError = (err, req, res, next) => {

    // Error de multer (ej: tamaño excedido)
    if (err instanceof multer.MulterError) {
        return res.status(400).json({
            status: "error",
            message: `Error de subida: ${err.message}`
        });
    }

    // Error personalizado (tipo de archivo no permitido)
    if (err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        });
    }

    // Si no hay error, continúa
    next();
};


// ------------------------------------------------------
// EXPORTAR MIDDLEWARES
// ------------------------------------------------------

// Exportamos upload y el manejador de errores
module.exports = {
    upload,
    handleMulterError
};