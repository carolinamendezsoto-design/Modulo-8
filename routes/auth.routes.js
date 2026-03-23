// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

const express = require("express");
const router = express.Router();


// ------------------------------------------------------
// IMPORTAR CONTROLADOR
// ------------------------------------------------------

// ⚠️ CORRECCIÓN IMPORTANTE → nombre consistente
const authController = require("../controllers/auth.controller");


// ------------------------------------------------------
// IMPORTAR MIDDLEWARE
// ------------------------------------------------------

const auth = require("../middlewares/auth.middleware");


// =======================================================
// 🔐 RUTAS DE AUTENTICACIÓN
// =======================================================


// ------------------------------------------------------
// LOGIN
// ------------------------------------------------------

// POST /api/auth/login
router.post(
    "/login",
    authController.login
);


// ------------------------------------------------------
// VERIFICAR TOKEN
// ------------------------------------------------------

// GET /api/auth/verify
router.get(
    "/verify",
    auth,
    (req, res) => {

        // Si pasa auth → token válido
        res.status(200).json({
            status: "success",
            message: "Token válido",
            data: req.user
        });
    }
);


// ------------------------------------------------------
// EXPORTAR ROUTER
// ------------------------------------------------------

module.exports = router;