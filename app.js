// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos Express → framework principal para crear el servidor HTTP
const express = require("express");

// Importamos path → permite construir rutas seguras entre sistemas (Windows/Linux)
const path = require("path");

// Importamos cors → permite comunicación entre frontend y backend (distintos puertos/dominios)
const cors = require("cors");

// Cargamos variables de entorno desde el archivo .env
require("dotenv").config();


// ------------------------------------------------------
// IMPORTAR MIDDLEWARES
// ------------------------------------------------------

// Middleware logger → registra cada request (método, ruta, etc.)
// ⚠️ Asegúrate que el archivo exista como: logger.middleware.js
const logger = require("./middlewares/logger.middleware");

// Middleware global de errores → captura errores de toda la app
// ⚠️ Asegúrate que el archivo exista como: error.middleware.js
const errorMiddleware = require("./middlewares/error.middleware");


// ------------------------------------------------------
// IMPORTAR MODELOS
// ------------------------------------------------------

// ⚠️ IMPORTANTE:
// Estos require no se usan directamente,
// pero ejecutan el código de los modelos para que Sequelize:
// - registre tablas
// - registre relaciones (associations)

// Modelo User
require("./models/user.model");

// Modelo Mascota
require("./models/mascota.model");

// Modelo Solicitud
require("./models/solicitud.model");


// ------------------------------------------------------
// IMPORTAR RUTAS
// ------------------------------------------------------

// Importamos rutas modulares (arquitectura limpia)

// Rutas de usuarios
const userRoutes = require("./routes/users.routes");

// Rutas de autenticación (login, verify)
const authRoutes = require("./routes/auth.routes");

// Rutas de subida de archivos (multer)
const uploadRoutes = require("./routes/upload.routes");

// Rutas de mascotas
const mascotaRoutes = require("./routes/mascota.routes");

// Rutas de solicitudes (adopciones)
const solicitudRoutes = require("./routes/solicitud.routes");


// ------------------------------------------------------
// CREAR APP EXPRESS
// ------------------------------------------------------

// Creamos la instancia principal de Express
const app = express();


// ------------------------------------------------------
// MIDDLEWARES GLOBALES
// ------------------------------------------------------

// Permite que el servidor entienda JSON en las requests
// limit evita ataques con payloads demasiado grandes
app.use(express.json({ limit: "10mb" }));

// Habilita CORS → permite que frontend (React, HTML, etc.) consuma la API
app.use(cors());

// Ejecuta el logger en cada request entrante
app.use(logger);


// ------------------------------------------------------
// ARCHIVOS ESTÁTICOS
// ------------------------------------------------------

// Sirve archivos del frontend (HTML, CSS, JS)
// Ej: http://localhost:3000/index.html
app.use(express.static(path.join(__dirname, "public")));

// Sirve imágenes subidas por usuarios (multer)
// Ej: http://localhost:3000/uploads/imagen.jpg
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// ------------------------------------------------------
// RUTAS BASE
// ------------------------------------------------------

// Ruta raíz → devuelve el index.html del frontend
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Ruta de estado → útil para monitoreo (deploy, health check)
app.get("/status", (req, res) => {
    res.json({
        status: "success",
        message: "Servidor activo"
    });
});


// ------------------------------------------------------
// RUTAS API
// ------------------------------------------------------

// Prefijo /api → buena práctica REST para separar frontend de backend

// Rutas de usuarios
app.use("/api/users", userRoutes);

// Rutas de autenticación
app.use("/api/auth", authRoutes);

// Rutas de subida de archivos
app.use("/api/upload", uploadRoutes);

// Rutas de mascotas
app.use("/api/mascotas", mascotaRoutes);

// Rutas de solicitudes (flujo de adopción)
app.use("/api/solicitudes", solicitudRoutes);


// ------------------------------------------------------
// MIDDLEWARE 404 (NOT FOUND)
// ------------------------------------------------------

// Si ninguna ruta coincide, Express llega aquí
app.use((req, res) => {
    res.status(404).json({
        status: "error",
        message: `Ruta no encontrada: ${req.originalUrl}` // mejora pro
    });
});


// ------------------------------------------------------
// MIDDLEWARE GLOBAL DE ERRORES
// ------------------------------------------------------

// Captura cualquier error lanzado en controllers/services
// ⚠️ SIEMPRE debe ir al final
app.use(errorMiddleware);


// ------------------------------------------------------
// EXPORTAR APP
// ------------------------------------------------------

// Exportamos la app para que server.js la use con app.listen()
module.exports = app;