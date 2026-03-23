// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// App principal (Express configurado)
const app = require("./app");

// Conexión a base de datos
const { connectDB, sequelize } = require("./config/database");

// Variables de entorno
require("dotenv").config();


// ------------------------------------------------------
// CONFIGURAR PUERTO
// ------------------------------------------------------

// Puerto desde .env o fallback
const PORT = process.env.PORT || 3000;


// ------------------------------------------------------
// FUNCIÓN PRINCIPAL
// ------------------------------------------------------

const startServer = async () => {

    try {

        // --------------------------------------------------
        // CONECTAR BASE DE DATOS
        // --------------------------------------------------

        await connectDB();

        console.log("✅ Base de datos conectada correctamente");


        // --------------------------------------------------
        // SINCRONIZAR MODELOS
        // --------------------------------------------------

        // Crea tablas si no existen
        await sequelize.sync();

        console.log("✅ Modelos sincronizados correctamente");


        // --------------------------------------------------
        // INICIAR SERVIDOR
        // --------------------------------------------------

        const server = app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });


        // --------------------------------------------------
        // CIERRE GRACEFUL (PRO)
        // --------------------------------------------------

        process.on("SIGTERM", () => {
            console.log("⚠️ Cerrando servidor (SIGTERM)...");
            server.close(() => {
                console.log("💤 Servidor cerrado correctamente");
                process.exit(0);
            });
        });

        process.on("SIGINT", () => {
            console.log("⚠️ Cerrando servidor (SIGINT)...");
            server.close(() => {
                console.log("💤 Servidor cerrado correctamente");
                process.exit(0);
            });
        });

    } catch (error) {

        // --------------------------------------------------
        // ERROR CRÍTICO
        // --------------------------------------------------

        console.error("❌ Error crítico al iniciar:");
        console.error(error.message);

        process.exit(1);
    }
};


// ------------------------------------------------------
// ERRORES GLOBALES
// ------------------------------------------------------

// Promesas no manejadas
process.on("unhandledRejection", (err) => {
    console.error("❌ Unhandled Rejection:", err.message);
});

// Errores síncronos
process.on("uncaughtException", (err) => {
    console.error("❌ Uncaught Exception:", err.message);
});


// ------------------------------------------------------
// EJECUTAR
// ------------------------------------------------------

startServer();