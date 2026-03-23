// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos la app ya configurada
const app = require("./app");

// Importamos conexión a base de datos
const { connectDB, sequelize } = require("./config/database");

// Cargamos variables de entorno
require("dotenv").config();


// ------------------------------------------------------
// CONFIGURAR PUERTO
// ------------------------------------------------------

// Usamos el puerto del .env o 3000
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

        // --------------------------------------------------
        // SINCRONIZAR MODELOS
        // --------------------------------------------------

        await sequelize.sync();

        console.log("✅ Base de datos sincronizada correctamente");


        // --------------------------------------------------
        // INICIAR SERVIDOR
        // --------------------------------------------------

        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });

    } catch (error) {

        // Si falla algo al iniciar
        console.error("❌ Error al iniciar servidor:", error.message);
    }
};


// ------------------------------------------------------
// EJECUTAR SERVIDOR
// ------------------------------------------------------

// Llamamos a la función principal
startServer();