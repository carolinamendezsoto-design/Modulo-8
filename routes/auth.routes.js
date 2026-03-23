// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

const express = require("express"); // Importamos express
const router = express.Router();   // Creamos instancia de router


// ------------------------------------------------------
// IMPORTAR CONTROLADOR
// ------------------------------------------------------

const authController = require("../controllers/auth.controller"); // Controlador de auth


// ------------------------------------------------------
// IMPORTAR MIDDLEWARE
// ------------------------------------------------------

const auth = require("../middlewares/auth.middleware"); // Middleware para proteger rutas


// =======================================================
// 🔐 RUTAS DE AUTENTICACIÓN
// =======================================================


// ------------------------------------------------------
// 🟢 REGISTRO (🔥 FIX CRÍTICO)
// ------------------------------------------------------

// POST /api/auth/register
// Esta ruta permite crear un nuevo usuario
router.post("/register", authController.register);


// ------------------------------------------------------
// 🔵 LOGIN
// ------------------------------------------------------

// POST /api/auth/login
// Esta ruta permite iniciar sesión
router.post("/login", authController.login);


// ------------------------------------------------------
// 🟡 VERIFICAR TOKEN
// ------------------------------------------------------

// GET /api/auth/verify
// Esta ruta valida si el token JWT es válido
router.get("/verify", auth, (req, res) => {

    // Si pasa el middleware auth → token válido
    res.status(200).json({
        status: "success",
        message: "Token válido",
        data: req.user // usuario decodificado del token
    });
});


// ------------------------------------------------------
// EXPORTAR ROUTER
// ------------------------------------------------------

module.exports = router; // Exportamos router para usarlo en app.js