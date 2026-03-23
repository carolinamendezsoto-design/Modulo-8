// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

const express = require("express"); // Framework backend
const path = require("path");       // Manejo de rutas
const cors = require("cors");       // Permite conexión frontend-backend

// Cargar variables de entorno
require("dotenv").config();


// ------------------------------------------------------
// IMPORTAR MIDDLEWARES
// ------------------------------------------------------

const logger = require("./middlewares/logger"); // Logger de requests
const errorMiddleware = require("./middlewares/error.middleware"); // Manejo global de errores


// ------------------------------------------------------
// IMPORTAR MODELOS
// ------------------------------------------------------

// Se importan solo para registrar en Sequelize
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
// CREAR APP
// ------------------------------------------------------

const app = express();


// ------------------------------------------------------
// MIDDLEWARES GLOBALES
// ------------------------------------------------------

// Permitir recibir JSON en requests
app.use(express.json());

// Permitir CORS (evita errores entre puertos)
app.use(cors());

// Logger de peticiones HTTP
app.use(logger);


// ------------------------------------------------------
// ARCHIVOS ESTÁTICOS
// ------------------------------------------------------

// Servir frontend
app.use(express.static(path.join(__dirname, "public")));

// Servir imágenes subidas
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// ------------------------------------------------------
// RUTAS BÁSICAS
// ------------------------------------------------------

// Ruta principal
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Ruta de salud del servidor (health check)
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

// Prefijo /api para mantener orden REST

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/mascotas", mascotaRoutes);
app.use("/api/solicitudes", solicitudRoutes);


// ------------------------------------------------------
// MIDDLEWARE 404 (NUEVO 🔥 MUY IMPORTANTE)
// ------------------------------------------------------

// Si ninguna ruta coincide, devolvemos error controlado
app.use((req, res, next) => {
    res.status(404).json({
        status: "error",
        message: "Ruta no encontrada",
        data: null
    });
});


// ------------------------------------------------------
// MIDDLEWARE DE ERRORES
// ------------------------------------------------------

// ⚠️ SIEMPRE AL FINAL
app.use(errorMiddleware);


// ------------------------------------------------------
// EXPORTAR APP
// ------------------------------------------------------

module.exports = app;