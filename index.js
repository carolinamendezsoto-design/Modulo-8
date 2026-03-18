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
const Post = require("./models/post");


// ------------------------------------------------------
// IMPORTAR RUTAS
// ------------------------------------------------------

// Importamos rutas de usuarios
const userRoutes = require("./routes/users");

// Importamos rutas de autenticación
const authRoutes = require("./routes/auth");

// Importamos rutas de subida de archivos
const uploadRoutes = require("./routes/upload");


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

        // Sincronizamos modelos con la base de datos
        // (crea tablas si no existen)
        await sequelize.sync();

        console.log("✅ Modelos sincronizados correctamente");

        // Iniciamos el servidor
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