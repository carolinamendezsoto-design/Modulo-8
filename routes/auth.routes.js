// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos Express para definir rutas HTTP
const express = require("express");

// Creamos una instancia del router
const router = express.Router();


// ------------------------------------------------------
// IMPORTAR CONTROLADOR DE AUTENTICACIÓN
// ------------------------------------------------------

// Controlador donde está la lógica de login
const authController = require("../controllers/authController");


// ------------------------------------------------------
// IMPORTAR MIDDLEWARE DE AUTENTICACIÓN
// ------------------------------------------------------

// Middleware que valida el token JWT
// 🔥 Esto lo usamos para verificar sesión
const auth = require("../middlewares/auth.middleware");


// =======================================================
// RUTAS DE AUTENTICACIÓN
// =======================================================


// =======================================================
// LOGIN DE USUARIO
// =======================================================

// Endpoint: POST /api/auth/login
// Permite autenticar un usuario y generar JWT
router.post(
    "/login",              // ruta relativa
    authController.login   // controller
);


// =======================================================
// VERIFICAR TOKEN (🔥 NIVEL PRO)
// =======================================================

// Endpoint: GET /api/auth/verify
// Permite comprobar si el token es válido
router.get(
    "/verify",             // ruta específica
    auth,                  // requiere token válido
    (req, res) => {

        // Si pasa el middleware, el token es válido
        // y req.user contiene la info del usuario

        res.json({
            status: "success",
            message: "Token válido",
            data: req.user // datos decodificados del JWT
        });
    }
);


// ------------------------------------------------------
// EXPORTAR ROUTER
// ------------------------------------------------------

// Exportamos el router para usarlo en index.js
module.exports = router;