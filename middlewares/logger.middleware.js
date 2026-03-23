// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

const fs = require("fs");     // manejo de archivos
const path = require("path"); // rutas seguras


// ------------------------------------------------------
// MIDDLEWARE LOGGER
// ------------------------------------------------------

// Registra cada request en un archivo log
const logger = (req, res, next) => {

    // Fecha en formato ISO (estándar)
    const date = new Date().toISOString();

    // Construimos línea de log
    const log = `${date} - ${req.method} ${req.url}\n`;

    // Ruta del archivo log
    const logPath = path.join(__dirname, "../logs/log.txt");

    // Escribimos en archivo (no bloqueante)
    fs.appendFile(logPath, log, (err) => {

        // Si hay error, lo mostramos pero no rompemos app
        if (err) {
            console.error("Error al escribir log:", err.message);
        }
    });

    // Continuamos flujo de Express
    next();
};


// ------------------------------------------------------
// EXPORTAR
// ------------------------------------------------------

module.exports = logger;