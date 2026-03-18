// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos Express para poder definir rutas HTTP
const express = require("express");

// Creamos una instancia del router de Express
// Esto permite separar las rutas del archivo principal (index.js)
const router = express.Router();


// ------------------------------------------------------
// IMPORTAR CONTROLLER DE AUTENTICACIÓN
// ------------------------------------------------------

// Importamos el controlador encargado de la autenticación
// Aquí se maneja la lógica del login (validación + JWT)
const authController = require("../controllers/authController");


// =======================================================
// RUTAS DE AUTENTICACIÓN
// =======================================================

// ------------------------------------------------------
// RUTA: LOGIN DE USUARIO
// ------------------------------------------------------

// Endpoint: POST /auth/login
// Esta ruta permite autenticar un usuario y generar un token JWT

router.post(
    "/login", // ruta relativa

    // Controlador que:
    // 1. Valida email y contraseña
    // 2. Genera el token JWT
    // 3. Retorna respuesta estructurada
    authController.login
);


// ------------------------------------------------------
// (OPCIONAL) RUTA: VERIFICAR TOKEN
// ------------------------------------------------------

// 💥 Esto NO es obligatorio, pero suma puntos pro
// Permite validar si el token enviado es válido

/*
const authMiddleware = require("../middlewares/auth");

router.get(
    "/verify",
    authMiddleware, // requiere token válido
    (req, res) => {
        res.json({
            status: "success",
            message: "Token válido",
            data: req.user // info del usuario decodificada
        });
    }
);
*/


// ------------------------------------------------------
// EXPORTAR ROUTER
// ------------------------------------------------------

// Exportamos el router para usarlo en index.js
module.exports = router;