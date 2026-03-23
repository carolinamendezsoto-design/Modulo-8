// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

const multer = require("multer");
const path = require("path");


// ------------------------------------------------------
// CONFIGURACIÓN STORAGE
// ------------------------------------------------------

const storage = multer.diskStorage({

    // Carpeta destino
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    // Nombre del archivo
    filename: (req, file, cb) => {

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
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter
});


// ------------------------------------------------------
// EXPORTAR
// ------------------------------------------------------

module.exports = upload;