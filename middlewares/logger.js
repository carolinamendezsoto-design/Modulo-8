// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos fs para trabajar con archivos
const fs = require("fs");

// Importamos path para manejar rutas correctamente
const path = require("path");


// ------------------------------------------------------
// MIDDLEWARE LOGGER (VERSIÓN PRO)
// ------------------------------------------------------

// Middleware que registra cada petición HTTP
const logger = (req, res, next) => {

    // --------------------------------------------------
    // CREAR MENSAJE DE LOG
    // --------------------------------------------------

    // Obtenemos fecha en formato ISO
    const date = new Date().toISOString();

    // Guardamos método (GET, POST, etc.) y URL
    const log = `${date} - ${req.method} ${req.url}\n`;


    // --------------------------------------------------
    // DEFINIR RUTA DEL ARCHIVO
    // --------------------------------------------------

    // Construimos la ruta segura al archivo log.txt
    const logPath = path.join(__dirname, "../logs/log.txt");


    // --------------------------------------------------
    // ESCRIBIR EN EL ARCHIVO
    // --------------------------------------------------

    fs.appendFile(logPath, log, (err) => {

        // Si hay error al escribir, lo mostramos en consola
        if (err) {
            console.error("Error al escribir el log:", err.message);
        }

    });


    // --------------------------------------------------
    // CONTINUAR FLUJO
    // --------------------------------------------------

    // Permite que la petición siga hacia el siguiente middleware o controller
    next();
};


// ------------------------------------------------------
// EXPORTAR MIDDLEWARE
// ------------------------------------------------------

module.exports = logger;