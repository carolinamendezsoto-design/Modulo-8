// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos Express (framework principal del servidor)
const express = require("express");

// Importamos path para manejar rutas del sistema de archivos
const path = require("path");

// 🔥 IMPORTAMOS CORS (SOLUCIÓN AL ERROR FRONTEND)
const cors = require("cors");

// Cargamos variables de entorno desde el archivo .env
require("dotenv").config();

// Importamos middleware personalizado para logs de peticiones
const logger = require("./middlewares/logger");

// Importamos middleware global para manejo de errores
const errorMiddleware = require("./middlewares/error.middleware");

// Importamos conexión a base de datos y sequelize
const { connectDB, sequelize } = require("./config/database");


// ------------------------------------------------------
// IMPORTAR MODELOS
// ------------------------------------------------------

// ⚠️ IMPORTANTE:
// Estos require NO se guardan en variables porque solo sirven
// para que Sequelize registre los modelos internamente

require("./models/user");        // Modelo de usuarios
require("./models/mascota");     // Modelo de mascotas
require("./models/solicitud");   // Modelo de solicitudes


// ------------------------------------------------------
// IMPORTAR RUTAS
// ------------------------------------------------------

// Rutas relacionadas a usuarios (CRUD + roles)
const userRoutes = require("./routes/users");

// Rutas de autenticación (login)
const authRoutes = require("./routes/auth");

// Rutas para subida de archivos (imágenes de mascotas)
const uploadRoutes = require("./routes/upload");

// Rutas de mascotas
const mascotaRoutes = require("./routes/mascota.routes");

// Rutas de solicitudes de adopción
const solicitudRoutes = require("./routes/solicitud.routes");


// ------------------------------------------------------
// CREAR APP
// ------------------------------------------------------

// Inicializamos la aplicación Express
const app = express();


// ------------------------------------------------------
// MIDDLEWARES
// ------------------------------------------------------

// Middleware para poder leer JSON desde el body
app.use(express.json());

// 🔥 CORS DEBE IR AQUÍ (ANTES DE LAS RUTAS)
// Permite que frontend (puerto 5500) se comunique con backend (3000)
app.use(cors());

// Middleware logger (muestra requests en consola)
app.use(logger);


// ------------------------------------------------------
// SERVIR ARCHIVOS ESTÁTICOS
// ------------------------------------------------------

// Servimos el frontend desde la carpeta "public"
app.use(express.static(path.join(__dirname, "public")));

// Servimos imágenes desde carpeta "uploads"
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// ------------------------------------------------------
// RUTA PRINCIPAL
// ------------------------------------------------------

// Cuando el usuario entra a "/", enviamos index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


// ------------------------------------------------------
// RUTA DE TEST (STATUS)
// ------------------------------------------------------

// Endpoint para verificar que el servidor está activo
app.get("/status", (req, res) => {
    res.json({
        status: "success",
        message: "Servidor activo",
        data: null
    });
});


// ------------------------------------------------------
// RUTAS API
// ------------------------------------------------------

// ⚠️ Todas las rutas tienen prefijo /api

// Usuarios
app.use("/api/users", userRoutes);

// Autenticación
app.use("/api/auth", authRoutes);

// Subida de archivos
app.use("/api/upload", uploadRoutes);

// Mascotas
app.use("/api/mascotas", mascotaRoutes);

// Solicitudes
app.use("/api/solicitudes", solicitudRoutes);


// ------------------------------------------------------
// MIDDLEWARE DE ERRORES
// ------------------------------------------------------

// ⚠️ SIEMPRE AL FINAL
// Captura errores de toda la aplicación
app.use(errorMiddleware);


// ------------------------------------------------------
// CONFIGURAR PUERTO
// ------------------------------------------------------

// Usamos el puerto del .env o 3000 por defecto
const PORT = process.env.PORT || 3000;


// ------------------------------------------------------
// FUNCIÓN PRINCIPAL PARA INICIAR SERVIDOR
// ------------------------------------------------------

const startServer = async () => {

    try {

        // Conectamos a la base de datos
        await connectDB();

        // Sincronizamos modelos (crea tablas si no existen)
        await sequelize.sync();

        console.log("✅ Base de datos sincronizada correctamente");

        // Iniciamos servidor
        app.listen(PORT, () => {
            console.log(`🚀 Servidor iniciado en http://localhost:${PORT}`);
        });

    } catch (error) {

        // Error al iniciar servidor
        console.error("❌ Error al iniciar el servidor:", error.message);
    }
};


// ------------------------------------------------------
// EJECUTAR SERVIDOR
// ------------------------------------------------------

startServer(); // Ejecutamos la app