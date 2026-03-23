// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

const express = require("express");     // Framework backend
const path = require("path");           // Manejo de rutas del sistema
const cors = require("cors");           // Permite conexión frontend-backend

// Variables de entorno (.env)
require("dotenv").config();


// ------------------------------------------------------
// IMPORTAR MIDDLEWARES
// ------------------------------------------------------

const logger = require("./middlewares/logger");              // Logger de requests
const errorMiddleware = require("./middlewares/error.middleware"); // Manejo global de errores


// ------------------------------------------------------
// IMPORTAR MODELOS (REGISTRO EN SEQUELIZE)
// ------------------------------------------------------

// 🔥 Esto asegura que Sequelize cargue los modelos
require("./models/user");
require("./models/mascota");
require("./models/solicitud");


// ------------------------------------------------------
// IMPORTAR RUTAS
// ------------------------------------------------------

const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const uploadRoutes = require("./routes/upload");
const mascotaRoutes = require("./routes/mascota.routes");
const solicitudRoutes = require("./routes/solicitud.routes");


// ------------------------------------------------------
// CREAR INSTANCIA DE EXPRESS
// ------------------------------------------------------

const app = express();


// ------------------------------------------------------
// CONFIGURACIÓN GLOBAL
// ------------------------------------------------------

// 🔥 Puerto desde .env o fallback
const PORT = process.env.PORT || 3000;


// ------------------------------------------------------
// MIDDLEWARES GLOBALES
// ------------------------------------------------------

// Permite recibir JSON en body
app.use(express.json());

// 🔥 Mejora pro: limitar tamaño del body (seguridad)
app.use(express.json({ limit: "10mb" }));

// Habilita CORS (permite conexión frontend)
app.use(cors());

// Logger de peticiones HTTP
app.use(logger);


// ------------------------------------------------------
// ARCHIVOS ESTÁTICOS
// ------------------------------------------------------

// Servir frontend (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Servir imágenes subidas
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// ------------------------------------------------------
// RUTAS BASE
// ------------------------------------------------------

// Ruta raíz → carga index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 🔥 Health check (muy usado en producción)
app.get("/status", (req, res) => {
    res.json({
        status: "success",
        message: "Servidor activo",
        data: {
            uptime: process.uptime(),        // tiempo activo del server
            timestamp: new Date()            // fecha actual
        }
    });
});


// ------------------------------------------------------
// RUTAS API
// ------------------------------------------------------

// Prefijo /api → organización REST

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/mascotas", mascotaRoutes);
app.use("/api/solicitudes", solicitudRoutes);


// ------------------------------------------------------
// MIDDLEWARE 404
// ------------------------------------------------------

// Si ninguna ruta coincide → error controlado
app.use((req, res, next) => {
    res.status(404).json({
        status: "error",
        message: `Ruta no encontrada: ${req.originalUrl}`,
        data: null
    });
});


// ------------------------------------------------------
// MIDDLEWARE GLOBAL DE ERRORES
// ------------------------------------------------------

// ⚠️ SIEMPRE AL FINAL
app.use(errorMiddleware);


// ------------------------------------------------------
// EXPORTAR APP
// ------------------------------------------------------

module.exports = app;