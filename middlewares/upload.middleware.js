// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

const multer = require("multer"); // librería upload
const path = require("path");     // manejo rutas
const fs = require("fs");         // sistema de archivos

// ------------------------------------------------------
// 🔥 CREAR CARPETA SI NO EXISTE (FIX CRÍTICO)
// ------------------------------------------------------

const uploadPath = "uploads/";

// Si la carpeta no existe → la creamos
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}


// ------------------------------------------------------
// CONFIGURACIÓN STORAGE
// ------------------------------------------------------

const storage = multer.diskStorage({

    // Carpeta destino
    destination: (req, file, cb) => {
        cb(null, uploadPath); // usamos ruta segura
    },

    // Nombre del archivo
    filename: (req, file, cb) => {

        // Nombre único para evitar colisiones
        const uniqueName = Date.now() + "-" + file.originalname;

        cb(null, uniqueName);
    }
});


// ------------------------------------------------------
// FILTRO DE ARCHIVOS
// ------------------------------------------------------

const fileFilter = (req, file, cb) => {

    // Tipos permitidos
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    // Validamos tipo
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Tipo de archivo no permitido"), false);
    }
};


// ------------------------------------------------------
// CONFIGURAR MULTER
// ------------------------------------------------------

const upload = multer({
    storage, // configuración storage
    limits: { fileSize: 5 * 1024 * 1024 }, // límite 5MB
    fileFilter // validación
});


// ------------------------------------------------------
// EXPORTAR
// ------------------------------------------------------

module.exports = upload;