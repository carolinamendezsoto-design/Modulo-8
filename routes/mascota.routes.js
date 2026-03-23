// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Express para definir rutas
const express = require("express");

// Router de Express
const router = express.Router();


// ------------------------------------------------------
// IMPORTAR CONTROLADOR
// ------------------------------------------------------

// Controlador (NO lógica aquí)
const mascotaController = require("../controllers/mascota.controller");


// ------------------------------------------------------
// IMPORTAR MIDDLEWARES
// ------------------------------------------------------

// Autenticación (JWT)
const auth = require("../middlewares/auth.middleware");

// Subida de archivos (multer)
const upload = require("../middlewares/upload.middleware");


// =======================================================
// 🔥 RUTAS ESPECÍFICAS (SIEMPRE PRIMERO)
// =======================================================

// ⚠️ IMPORTANTE:
// Estas rutas van antes de "/:id"
// para evitar conflictos de routing


// ------------------------------------------------------
// MATCH DE MASCOTAS
// ------------------------------------------------------

// GET /api/mascotas/match/filtro
router.get(
    "/match/filtro",                      // ruta específica
    mascotaController.getMatchMascotas    // controller
);


// ------------------------------------------------------
// CAMBIAR ESTADO (ADOPCIÓN)
// ------------------------------------------------------

// PUT /api/mascotas/:id/estado
router.put(
    "/:id/estado",                        // 🔥 ruta específica
    auth,                                 // requiere login
    mascotaController.cambiarEstadoMascota
);


// =======================================================
// 📦 CRUD GENERAL
// =======================================================


// ------------------------------------------------------
// OBTENER TODAS LAS MASCOTAS
// ------------------------------------------------------

// GET /api/mascotas
router.get(
    "/",                                  // ruta base
    mascotaController.getMascotas
);


// ------------------------------------------------------
// OBTENER MASCOTA POR ID
// ------------------------------------------------------

// ⚠️ SIEMPRE DESPUÉS DE RUTAS ESPECÍFICAS

// GET /api/mascotas/:id
router.get(
    "/:id",
    mascotaController.getMascotaById
);


// ------------------------------------------------------
// CREAR MASCOTA
// ------------------------------------------------------

// POST /api/mascotas
router.post(
    "/",                                  // base
    auth,                                 // requiere usuario
    upload.single("imagen"),               // subida de imagen
    mascotaController.createMascota
);


// ------------------------------------------------------
// ACTUALIZAR MASCOTA
// ------------------------------------------------------

// PUT /api/mascotas/:id
router.put(
    "/:id",
    auth,
    upload.single("imagen"),               // opcional
    mascotaController.updateMascota
);


// ------------------------------------------------------
// ELIMINAR MASCOTA
// ------------------------------------------------------

// DELETE /api/mascotas/:id
router.delete(
    "/:id",
    auth,
    mascotaController.deleteMascota
);


// ------------------------------------------------------
// EXPORTAR ROUTER
// ------------------------------------------------------

module.exports = router;