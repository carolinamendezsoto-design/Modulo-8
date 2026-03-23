// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Multer → manejo de subida de archivos
const multer = require("multer");

// Path → manejo de rutas del sistema
const path = require("path");

// FS → sistema de archivos (crear carpetas, validar existencia)
const fs = require("fs");


// ------------------------------------------------------
// ASEGURAR CARPETA UPLOADS
// ------------------------------------------------------

// Ruta absoluta hacia la carpeta uploads
const uploadDir = path.join(__dirname, "..", "uploads");

// Si la carpeta NO existe → la creamos automáticamente
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}


// ------------------------------------------------------
// FUNCIÓN AUXILIAR: LIMPIAR NOMBRE DE ARCHIVO
// ------------------------------------------------------

// 🔥 Mejora pro: sanitiza nombres (evita problemas y ataques básicos)
const sanitizeFileName = (filename) => {
    return filename
        .replace(/\s+/g, "_")           // espacios → _
        .replace(/[^a-zA-Z0-9._-]/g, "") // elimina caracteres raros
        .toLowerCase();                // todo en minúscula
};


// ------------------------------------------------------
// CONFIGURACIÓN DE STORAGE
// ------------------------------------------------------

const storage = multer.diskStorage({

    // 📁 Dónde guardar archivos
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },

    // 🏷️ Cómo nombrar archivos
    filename: (req, file, cb) => {

        // Limpiamos nombre original
        const safeName = sanitizeFileName(file.originalname);

        // Extraemos extensión (.jpg, .png, etc.)
        const ext = path.extname(safeName);

        // Generamos nombre único (timestamp + random)
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;

        // Guardamos archivo con nombre seguro
        cb(null, uniqueName);
    }
});


// ------------------------------------------------------
// FILTRO DE ARCHIVOS (SEGURIDAD)
// ------------------------------------------------------

const fileFilter = (req, file, cb) => {

    // Tipos permitidos
    const allowedMimeTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp"
    ];

    // Validar tipo MIME
    if (allowedMimeTypes.includes(file.mimetype)) {

        cb(null, true);

    } else {

        // 🔥 Error claro para frontend
        cb(new Error("Tipo de archivo no permitido. Solo imágenes (jpg, jpeg, png, webp)"), false);
    }
};


// ------------------------------------------------------
// CONFIGURACIÓN FINAL DE MULTER
// ------------------------------------------------------

const upload = multer({

    // Dónde y cómo guardar archivos
    storage,

    // 🔥 Límite de tamaño (5MB)
    limits: {
        fileSize: 5 * 1024 * 1024
    },

    // Validación de archivos
    fileFilter
});


// ------------------------------------------------------
// MIDDLEWARE DE ERRORES (PRO)
// ------------------------------------------------------

const handleMulterError = (err, req, res, next) => {

    // Error propio de multer (ej: archivo muy grande)
    if (err instanceof multer.MulterError) {

        // Error específico por tamaño
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                status: "error",
                message: "El archivo supera el tamaño máximo permitido (5MB)"
            });
        }

        // Otros errores de multer
        return res.status(400).json({
            status: "error",
            message: err.message
        });
    }

    // Error personalizado (fileFilter, etc.)
    if (err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        });
    }

    // Si no hay errores → continúa
    next();
};


// ------------------------------------------------------
// EXPORTAR
// ------------------------------------------------------

module.exports = {
    upload,              // middleware principal
    handleMulterError    // middleware de errores
};