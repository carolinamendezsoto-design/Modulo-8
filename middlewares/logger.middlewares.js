// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos fs para trabajar con archivos del sistema
const fs = require("fs");

// Importamos path para manejar rutas de forma segura
const path = require("path");


// ------------------------------------------------------
// MIDDLEWARE LOGGER
// ------------------------------------------------------

// Definimos middleware que registra cada petición HTTP
const logger = (req, res, next) => {

    // --------------------------------------------------
    // GENERAR FECHA
    // --------------------------------------------------

    // Obtenemos la fecha actual en formato ISO (estándar)
    const date = new Date().toISOString();

    // --------------------------------------------------
    // CREAR MENSAJE DE LOG
    // --------------------------------------------------

    // Construimos el mensaje con fecha, método y URL
    const log = `${date} - ${req.method} ${req.url}\n`;

    // --------------------------------------------------
    // DEFINIR RUTA DEL ARCHIVO
    // --------------------------------------------------

    // Generamos la ruta absoluta al archivo log.txt
    const logPath = path.join(__dirname, "../logs/log.txt");

    // --------------------------------------------------
    // ESCRIBIR EN EL ARCHIVO
    // --------------------------------------------------

    // Agregamos el log al archivo sin sobrescribir (append)
    fs.appendFile(logPath, log, (err) => {

        // Si ocurre un error al escribir el archivo
        if (err) {

            // Mostramos el error en consola
            console.error("Error al escribir log:", err.message);
        }
    });

    // --------------------------------------------------
    // CONTINUAR FLUJO
    // --------------------------------------------------

    // Permitimos que la request siga hacia el siguiente middleware
    next();
};


// ------------------------------------------------------
// EXPORTAR MIDDLEWARE
// ------------------------------------------------------

// Exportamos el middleware para usarlo en la app
module.exports = logger;