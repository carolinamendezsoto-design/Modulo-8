// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// App principal ya configurada
const app = require("./app");

// Configuración de base de datos
const { connectDB, sequelize } = require("./config/database");

// Variables de entorno
require("dotenv").config();


// ------------------------------------------------------
// CONFIGURAR PUERTO
// ------------------------------------------------------

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

        console.log("✅ Base de datos conectada");


        // --------------------------------------------------
        // SINCRONIZAR MODELOS
        // --------------------------------------------------

        await sequelize.sync();

        console.log("✅ Modelos sincronizados correctamente");


        // --------------------------------------------------
        // INICIAR SERVIDOR
        // --------------------------------------------------

        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });

    } catch (error) {

        // --------------------------------------------------
        // ERROR CRÍTICO DE ARRANQUE
        // --------------------------------------------------

        console.error("❌ ERROR CRÍTICO AL INICIAR:");
        console.error(error.message);

        // Salimos del proceso (esto es nivel profesional)
        process.exit(1);
    }
};


// ------------------------------------------------------
// MANEJO DE ERRORES GLOBALES (PRO LEVEL 🔥)
// ------------------------------------------------------

// Captura errores no manejados en promesas
process.on("unhandledRejection", (err) => {
    console.error("❌ Unhandled Rejection:", err.message);
});

// Captura errores síncronos no controlados
process.on("uncaughtException", (err) => {
    console.error("❌ Uncaught Exception:", err.message);
});


// ------------------------------------------------------
// EJECUTAR SERVIDOR
// ------------------------------------------------------

startServer();