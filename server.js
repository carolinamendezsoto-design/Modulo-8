// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos la aplicación principal de Express (configurada en app.js)
const app = require("./app");

// Importamos la función de conexión a la base de datos y la instancia Sequelize
const { connectDB, sequelize } = require("./config/database");

// Cargamos variables de entorno desde el archivo .env
require("dotenv").config();


// ------------------------------------------------------
// CONFIGURACIÓN DEL PUERTO
// ------------------------------------------------------

// Definimos el puerto en el que correrá el servidor
// Usamos el puerto del .env o 3000 por defecto
const PORT = process.env.PORT || 3000;


// ------------------------------------------------------
// FUNCIÓN PRINCIPAL DEL SERVIDOR
// ------------------------------------------------------

// Función async para iniciar todo el backend
const startServer = async () => {

    try {

        // --------------------------------------------------
        // CONEXIÓN A BASE DE DATOS
        // --------------------------------------------------

        // Ejecutamos la conexión a PostgreSQL
        await connectDB();

        // Confirmamos conexión exitosa
        console.log("✅ Base de datos conectada correctamente");


        // --------------------------------------------------
        // ⚠️ IMPORTANTE: NO BORRAR BASE DE DATOS
        // --------------------------------------------------

        // ❌ ELIMINADO:
        // Antes tenías un reset que borraba todas las tablas
        // Esto causaba que el usuario desapareciera en cada reinicio
        // Ahora lo dejamos limpio para desarrollo real


        // --------------------------------------------------
        // SINCRONIZAR MODELOS CON SEQUELIZE
        // --------------------------------------------------

        // Sequelize sincroniza los modelos con la base de datos
        // alter: true ajusta columnas sin borrar datos existentes
        await sequelize.sync({
            alter: true
        });

        // Confirmamos sincronización
        console.log("✅ Modelos sincronizados correctamente");


        // --------------------------------------------------
        // INICIAR SERVIDOR HTTP
        // --------------------------------------------------

        // Levantamos el servidor en el puerto definido
        const server = app.listen(PORT, () => {

            // Mostramos URL en consola
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);

        });


        // --------------------------------------------------
        // CIERRE CONTROLADO DEL SERVIDOR
        // --------------------------------------------------

        // Capturamos señal SIGTERM (uso en producción)
        process.on("SIGTERM", () => {

            console.log("⚠️ Cerrando servidor (SIGTERM)...");

            // Cerramos servidor correctamente
            server.close(() => process.exit(0));

        });

        // Capturamos Ctrl + C (desarrollo)
        process.on("SIGINT", () => {

            console.log("⚠️ Cerrando servidor (SIGINT)...");

            // Cerramos servidor correctamente
            server.close(() => process.exit(0));

        });

    } catch (error) {

        // --------------------------------------------------
        // MANEJO DE ERROR CRÍTICO
        // --------------------------------------------------

        // Mostramos mensaje de error general
        console.error("❌ Error crítico al iniciar servidor:");

        // Mostramos detalle del error
        console.error(error.message);

        // Terminamos ejecución si algo falla
        process.exit(1);
    }
};


// ------------------------------------------------------
// MANEJO GLOBAL DE ERRORES
// ------------------------------------------------------

// Captura errores de promesas no manejadas (async)
process.on("unhandledRejection", err => {

    console.error("❌ Unhandled Rejection:", err.message);

});

// Captura errores síncronos no controlados
process.on("uncaughtException", err => {

    console.error("❌ Uncaught Exception:", err.message);

});


// ------------------------------------------------------
// INICIO DEL SERVIDOR
// ------------------------------------------------------

// Ejecutamos la función principal para iniciar el backend
startServer();