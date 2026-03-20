// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos Express para poder crear rutas HTTP
const express = require("express");

// Creamos una instancia del router
const router = express.Router();


// ------------------------------------------------------
// IMPORTAR MIDDLEWARES
// ------------------------------------------------------

// Middleware de autenticación (JWT)
const auth = require("../middlewares/auth");

// 🔥 Middleware para validar ADMIN
const isAdmin = require("../middlewares/isAdmin");

// Middleware de subida de archivos (multer)
const upload = require("../middlewares/upload");


// ------------------------------------------------------
// IMPORTAR CONTROLLER
// ------------------------------------------------------

// Importamos el controlador de mascotas
const mascotaController = require("../controllers/mascota.controller");


// =======================================================
// RUTAS RESTFUL DE MASCOTAS
// =======================================================


// ------------------------------------------------------
// MATCH DE MASCOTAS (🔥 NUEVO)
// ------------------------------------------------------

// Endpoint: GET /api/mascotas/match
// Ej: /match?energia=Media&porte=Pequeña
router.get(
    "/match",
    auth, // debe estar logueado
    mascotaController.getMatchMascotas
);


// ------------------------------------------------------
// OBTENER TODAS LAS MASCOTAS
// ------------------------------------------------------

router.get(
    "/",
    auth,
    mascotaController.getMascotas
);


// ------------------------------------------------------
// OBTENER MASCOTA POR ID
// ------------------------------------------------------

router.get(
    "/:id",
    auth,
    mascotaController.getMascotaById
);


// ------------------------------------------------------
// CREAR MASCOTA
// ------------------------------------------------------

router.post(
    "/",
    auth,
    upload.single("imagen"),
    mascotaController.createMascota
);


// ------------------------------------------------------
// ACTUALIZAR MASCOTA
// ------------------------------------------------------

// 🔥 SOLO ADMIN
router.put(
    "/:id",
    auth,
    isAdmin, // 👈 protección por rol
    upload.single("imagen"),
    mascotaController.updateMascota
);


// ------------------------------------------------------
// ELIMINAR MASCOTA
// ------------------------------------------------------

// 🔥 SOLO ADMIN
router.delete(
    "/:id",
    auth,
    isAdmin, // 👈 protección por rol
    mascotaController.deleteMascota
);


// ------------------------------------------------------
// EXPORTAR ROUTER
// ------------------------------------------------------

module.exports = router;