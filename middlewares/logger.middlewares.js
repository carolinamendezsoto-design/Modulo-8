// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

const fs = require("fs"); // manejo de archivos
const path = require("path"); // rutas seguras


// ------------------------------------------------------
// MIDDLEWARE LOGGER
// ------------------------------------------------------

const logger = (req, res, next) => {

    // Fecha en formato estándar ISO
    const date = new Date().toISOString();

    // Construimos log
    const log = `${date} - ${req.method} ${req.url}\n`;

    // Ruta del archivo log
    const logPath = path.join(__dirname, "../logs/log.txt");

    // Escribimos en archivo
    fs.appendFile(logPath, log, (err) => {

        // Si hay error, lo mostramos pero no rompemos la app
        if (err) {
            console.error("Error al escribir log:", err.message);
        }
    });

    // Continuamos flujo
    next();
};


// ------------------------------------------------------
// EXPORTAR
// ------------------------------------------------------

module.exports = logger;