// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos multer para manejar subida de archivos
const multer = require("multer");

// Importamos path para trabajar con extensiones
const path = require("path");


// ------------------------------------------------------
// CONFIGURAR ALMACENAMIENTO
// ------------------------------------------------------

const storage = multer.diskStorage({

    // Carpeta donde se guardarán los archivos
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    // Nombre del archivo
    filename: (req, file, cb) => {

        // Creamos nombre único con timestamp
        const uniqueName = Date.now() + path.extname(file.originalname);

        cb(null, uniqueName);
    }
});


// ------------------------------------------------------
// VALIDAR TIPO DE ARCHIVO
// ------------------------------------------------------

const fileFilter = (req, file, cb) => {

    // Tipos permitidos
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    // Si el tipo está permitido
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {

        // Rechazamos archivo
        cb(new Error("Solo se permiten imágenes (jpg, jpeg, png)"), false);
    }
};


// ------------------------------------------------------
// CONFIGURACIÓN FINAL DE MULTER
// ------------------------------------------------------

const upload = multer({

    storage: storage, // configuración de almacenamiento

    fileFilter: fileFilter, // validación de tipo

    limits: {

        // Tamaño máximo (2MB)
        fileSize: 2 * 1024 * 1024
    }
});


// ------------------------------------------------------
// EXPORTAR
// ------------------------------------------------------

module.exports = upload;