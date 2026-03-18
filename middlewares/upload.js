// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos multer para manejar subida de archivos
const multer = require("multer");

// Importamos path para manejar rutas correctamente
const path = require("path");

// Importamos fs para verificar/crear carpetas
const fs = require("fs");


// ------------------------------------------------------
// ASEGURAR CARPETA UPLOADS
// ------------------------------------------------------

// Definimos la ruta de la carpeta uploads
const uploadPath = path.join(__dirname, "../public/uploads");

// Si la carpeta no existe, la creamos automáticamente
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}


// ------------------------------------------------------
// CONFIGURACIÓN DE STORAGE
// ------------------------------------------------------

const storage = multer.diskStorage({

  // Definimos dónde se guardarán los archivos
  destination: (req, file, cb) => {

    // Usamos la ruta segura creada arriba
    cb(null, uploadPath);
  },

  // Definimos el nombre del archivo
  filename: (req, file, cb) => {

    // Obtenemos la extensión del archivo (.jpg, .png, etc.)
    const ext = path.extname(file.originalname);

    // Creamos nombre único (timestamp + extensión)
    const uniqueName = Date.now() + ext;

    // Guardamos el archivo con ese nombre
    cb(null, uniqueName);
  }
});


// ------------------------------------------------------
// FILTRO DE ARCHIVOS
// ------------------------------------------------------

const fileFilter = (req, file, cb) => {

  // Validamos que sea una imagen
  if (file.mimetype.startsWith("image/")) {

    // Aceptamos archivo
    cb(null, true);

  } else {

    // Rechazamos archivo con error (lo manejará el middleware global)
    cb(new Error("Solo se permiten imágenes"));
  }
};


// ------------------------------------------------------
// CONFIGURACIÓN FINAL DE MULTER
// ------------------------------------------------------

const upload = multer({

  // Configuración de almacenamiento
  storage,

  // Filtro de archivos
  fileFilter,

  // Límites
  limits: {

    // Tamaño máximo: 2MB
    fileSize: 2 * 1024 * 1024
  }
});


// ------------------------------------------------------
// EXPORTAR
// ------------------------------------------------------

module.exports = upload;