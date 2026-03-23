// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos express (framework backend)
const express = require("express");

// Importamos path para manejar rutas de archivos
const path = require("path");

// Importamos CORS (permite conexión entre frontend y backend)
const cors = require("cors");

// Cargamos variables de entorno (.env)
require("dotenv").config();


// ------------------------------------------------------
// IMPORTAR MIDDLEWARES
// ------------------------------------------------------

// Middleware de logs (muestra requests en consola)
const logger = require("./middlewares/logger");

// Middleware global de errores
const errorMiddleware = require("./middlewares/error.middleware");


// ------------------------------------------------------
// IMPORTAR MODELOS
// ------------------------------------------------------

// ⚠️ Solo se importan para que Sequelize los registre internamente

require("./models/user");       // modelo User
require("./models/mascota");   // modelo Mascota
require("./models/solicitud"); // modelo Solicitud


// ------------------------------------------------------
// IMPORTAR RUTAS
// ------------------------------------------------------

// Rutas de usuarios
const userRoutes = require("./routes/users");

// Rutas de autenticación
const authRoutes = require("./routes/auth");

// Rutas de subida de archivos
const uploadRoutes = require("./routes/upload");

// Rutas de mascotas
const mascotaRoutes = require("./routes/mascota.routes");

// Rutas de solicitudes
const solicitudRoutes = require("./routes/solicitud.routes");


// ------------------------------------------------------
// CREAR APP
// ------------------------------------------------------

// Inicializamos la aplicación Express
const app = express();


// ------------------------------------------------------
// MIDDLEWARES
// ------------------------------------------------------

// Permite recibir JSON en el body
app.use(express.json());

// Habilita CORS (evita error entre puertos)
app.use(cors());

// Logger de peticiones
app.use(logger);


// ------------------------------------------------------
// ARCHIVOS ESTÁTICOS
// ------------------------------------------------------

// Servimos frontend (carpeta public)
app.use(express.static(path.join(__dirname, "public")));

// Servimos imágenes (carpeta uploads)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// ------------------------------------------------------
// RUTAS BÁSICAS
// ------------------------------------------------------

// Ruta principal → devuelve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Ruta de prueba → status del servidor
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

// Todas las rutas tienen prefijo /api

app.use("/api/users", userRoutes);         // usuarios
app.use("/api/auth", authRoutes);          // login
app.use("/api/upload", uploadRoutes);      // subida imágenes
app.use("/api/mascotas", mascotaRoutes);   // mascotas
app.use("/api/solicitudes", solicitudRoutes); // solicitudes


// ------------------------------------------------------
// MIDDLEWARE DE ERRORES
// ------------------------------------------------------

// ⚠️ Siempre al final
app.use(errorMiddleware);


// ------------------------------------------------------
// EXPORTAR APP
// ------------------------------------------------------

// Exportamos la app (NO se ejecuta aquí)
module.exports = app;