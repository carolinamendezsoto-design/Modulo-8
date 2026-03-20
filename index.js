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

// Importamos el modelo Mascota
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

// Middleware para poder recibir JSON en las peticiones
app.use(express.json());

// Middleware logger (registra cada petición)
app.use(logger);


// ------------------------------------------------------
// SERVIR ARCHIVOS ESTÁTICOS
// ------------------------------------------------------

// Servimos archivos desde /public (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Servimos imágenes desde /uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// ------------------------------------------------------
// RUTA PRINCIPAL
// ------------------------------------------------------

// Cuando el usuario entra a "/", se carga index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


// ------------------------------------------------------
// RUTA STATUS
// ------------------------------------------------------

// Ruta para verificar que el servidor funciona
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

// Rutas de usuarios
app.use("/api/users", userRoutes);

// Rutas de autenticación
app.use("/auth", authRoutes);

// Rutas de subida de archivos
app.use("/upload", uploadRoutes);

// Rutas de mascotas
app.use("/api/mascotas", mascotaRoutes);


// ------------------------------------------------------
// MIDDLEWARE DE ERRORES
// ------------------------------------------------------

// Captura todos los errores de la app
app.use(errorMiddleware);


// ------------------------------------------------------
// CONFIGURAR PUERTO
// ------------------------------------------------------

// Puerto desde .env o 3000
const PORT = process.env.PORT || 3000;


// ------------------------------------------------------
// INICIAR SERVIDOR
// ------------------------------------------------------

const startServer = async () => {

    try {

        // Conectamos a la base de datos
        await connectDB();

        // ---------------------------------------------
        // 🔥 IMPORTANTE PARA EL ROL (SOLO UNA VEZ)
        // ---------------------------------------------

        // ⚠️ TEMPORAL:
        // Usa force:true SOLO UNA VEZ para crear el campo "rol"
        // Luego debes volver a sync() normal
        await sequelize.sync({ force: true });

        console.log("✅ Base de datos sincronizada con rol");

        // ---------------------------------------------
        // INICIAR SERVIDOR
        // ---------------------------------------------

        app.listen(PORT, () => {
            console.log(`🚀 Servidor iniciado en http://localhost:${PORT}`);
        });

    } catch (error) {

        console.error("❌ Error al iniciar el servidor:", error.message);
    }
};


// Ejecutamos servidor
startServer();