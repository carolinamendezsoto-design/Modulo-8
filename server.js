// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos la aplicación principal de Express
const app = require("./app");

// Importamos conexión a DB y sequelize
const { connectDB, sequelize } = require("./config/database");

// Cargamos variables de entorno
require("dotenv").config();


// ------------------------------------------------------
// CONFIGURACIÓN DEL PUERTO
// ------------------------------------------------------

const PORT = process.env.PORT || 3000;


// ------------------------------------------------------
// 🚨 CONTROL DE RESET (SOLO UNA VEZ)
// ------------------------------------------------------

// 🔥 Creamos una variable de entorno para controlar reset
// Si existe RESET_DB=true → se borra la BD UNA VEZ
const RESET_DB = process.env.RESET_DB === "true";


// ------------------------------------------------------
// FUNCIÓN PRINCIPAL DEL SERVIDOR
// ------------------------------------------------------

const startServer = async () => {

    try {

        // --------------------------------------------------
        // CONEXIÓN A BASE DE DATOS
        // --------------------------------------------------

        await connectDB();
        console.log("✅ Base de datos conectada correctamente");


        // --------------------------------------------------
        // 🔥 RESET CONTROLADO (SOLO UNA VEZ)
        // --------------------------------------------------

        if (RESET_DB) {

            console.log("🧨 RESET DE BASE DE DATOS ACTIVADO...");

            // 🔥 force: true → BORRA y CREA todo desde cero
            await sequelize.sync({ force: true });

            console.log("🔥 Base de datos RESETEADA correctamente");

        } else {

            // --------------------------------------------------
            // MODO NORMAL (NO BORRA DATOS)
            // --------------------------------------------------

            // alter: true → ajusta estructura sin borrar info
            await sequelize.sync({ alter: true });

            console.log("✅ Modelos sincronizados correctamente (modo seguro)");

        }


        // --------------------------------------------------
        // INICIAR SERVIDOR
        // --------------------------------------------------

        const server = app.listen(PORT, () => {

            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);

        });


        // --------------------------------------------------
        // CIERRE CONTROLADO
        // --------------------------------------------------

        process.on("SIGTERM", () => {

            console.log("⚠️ Cerrando servidor (SIGTERM)...");
            server.close(() => process.exit(0));

        });

        process.on("SIGINT", () => {

            console.log("⚠️ Cerrando servidor (SIGINT)...");
            server.close(() => process.exit(0));

        });

    } catch (error) {

        // --------------------------------------------------
        // ERROR CRÍTICO
        // --------------------------------------------------

        console.error("❌ Error crítico al iniciar servidor:");
        console.error(error.message);

        process.exit(1);
    }
};


// ------------------------------------------------------
// MANEJO GLOBAL DE ERRORES
// ------------------------------------------------------

process.on("unhandledRejection", err => {
    console.error("❌ Unhandled Rejection:", err.message);
});

process.on("uncaughtException", err => {
    console.error("❌ Uncaught Exception:", err.message);
});


// ------------------------------------------------------
// INICIO
// ------------------------------------------------------

startServer();