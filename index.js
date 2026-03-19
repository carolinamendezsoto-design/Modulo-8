// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos Express (framework para crear el servidor)
const express = require("express");

// Importamos path para manejar rutas de archivos correctamente
const path = require("path");

// Importamos dotenv para usar variables de entorno (.env)
require("dotenv").config();

// Importamos middleware de logs (para registrar peticiones)
const logger = require("./middlewares/logger");

// Importamos middleware global de manejo de errores
const errorMiddleware = require("./middlewares/error.middleware");

// Importamos conexión a base de datos (PostgreSQL)
const { connectDB, sequelize } = require("./config/database");


// ------------------------------------------------------
// IMPORTAR MODELOS
// ------------------------------------------------------

// Importamos modelos para que Sequelize los registre
const User = require("./models/user");

// Importamos el modelo Mascota (ya actualizado con "porte")
const Mascota = require("./models/mascota");


// ------------------------------------------------------
// IMPORTAR RUTAS
// ------------------------------------------------------

// Importamos rutas de usuarios
const userRoutes = require("./routes/users");

// Importamos rutas de autenticación
const authRoutes = require("./routes/auth");

// Importamos rutas de subida de archivos
const uploadRoutes = require("./routes/upload");

// Importamos rutas de mascotas
const mascotaRoutes = require("./routes/mascota.routes");


// ------------------------------------------------------
// CREAR APP
// ------------------------------------------------------

// Creamos la aplicación de Express
const app = express();


// ------------------------------------------------------
// MIDDLEWARES
// ------------------------------------------------------

// Middleware para poder recibir JSON en las peticiones (POST, PUT, etc.)
app.use(express.json());

// Middleware logger (registra cada petición que llega al servidor)
app.use(logger);


// ------------------------------------------------------
// SERVIR ARCHIVOS ESTÁTICOS
// ------------------------------------------------------

// Servimos archivos estáticos desde la carpeta public (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Servimos archivos subidos (imagenes, etc.)
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));


// ------------------------------------------------------
// RUTA PRINCIPAL
// ------------------------------------------------------

// Cuando el usuario entra a "/", se carga automáticamente index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


// ------------------------------------------------------
// RUTA STATUS (para verificar servidor)
// ------------------------------------------------------

// Ruta simple para comprobar que el servidor está funcionando
app.get("/status", (req, res) => {
    res.json({
        status: "OK",
        message: "Servidor activo"
    });
});


// ------------------------------------------------------
// RUTAS API
// ------------------------------------------------------

// Rutas de usuarios
app.use("/api/users", userRoutes);

// Rutas de autenticación
app.use("/auth", authRoutes);

// Rutas de subida de archivos
app.use("/upload", uploadRoutes);

// Rutas de mascotas (nuevo módulo principal del proyecto)
app.use("/api/mascotas", mascotaRoutes);


// ------------------------------------------------------
// MIDDLEWARE DE ERRORES (SIEMPRE AL FINAL)
// ------------------------------------------------------

// Este middleware captura todos los errores de la app
app.use(errorMiddleware);


// ------------------------------------------------------
// CONFIGURAR PUERTO
// ------------------------------------------------------

// Puerto definido en .env o 3000 por defecto
const PORT = process.env.PORT || 3000;


// ------------------------------------------------------
// INICIAR SERVIDOR
// ------------------------------------------------------

// Función async para iniciar todo el sistema
const startServer = async () => {

    try {

        // Conectamos a la base de datos PostgreSQL
        await connectDB();

        // ---------------------------------------------
        // SINCRONIZAR MODELOS (IMPORTANTE)
        // ---------------------------------------------

        // ⚠️ force: true → elimina tablas y las recrea
        // Esto asegura que "porte" exista en la BD
        await sequelize.sync({ force: true });

        console.log("✅ Modelos sincronizados correctamente (recreados)");

        // ---------------------------------------------
        // INICIAR SERVIDOR
        // ---------------------------------------------

        // Levantamos el servidor en el puerto definido
        app.listen(PORT, () => {
            console.log(`🚀 Servidor iniciado en http://localhost:${PORT}`);
        });

    } catch (error) {

        // Si ocurre un error al iniciar el servidor
        console.error("❌ Error al iniciar el servidor:", error.message);
    }
};


// Ejecutamos la función para iniciar el servidor
startServer();