// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

const express = require("express"); // framework
const router = express.Router();    // instancia router


// ------------------------------------------------------
// IMPORTAR CONTROLADOR
// ------------------------------------------------------

const mascotaController = require("../controllers/mascota.controller");


// ------------------------------------------------------
// IMPORTAR MIDDLEWARES
// ------------------------------------------------------

const auth = require("../middlewares/auth.middleware");       // JWT
const upload = require("../middlewares/upload.middleware");   // multer


// =======================================================
// 🔥 RUTAS ESPECÍFICAS (ANTES DE :id)
// =======================================================


// ------------------------------------------------------
// MATCH DE MASCOTAS
// ------------------------------------------------------

// GET /api/mascotas/match
// Mejor práctica REST → no usar /filtro
// router.get(
//     "/match",
//     mascotaController.getMatchMascotas
// );


// ------------------------------------------------------
// CAMBIAR ESTADO (ADOPCIÓN)
// ------------------------------------------------------

// PUT /api/mascotas/:id/estado
router.put(
    "/:id/estado",
    auth, // requiere autenticación
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
    "/",
    mascotaController.getMascotas
);


// ------------------------------------------------------
// OBTENER MASCOTA POR ID
// ------------------------------------------------------

// GET /api/mascotas/:id
// ⚠️ siempre después de rutas específicas
router.get(
    "/:id",
    mascotaController.getMascotaById
);


// ------------------------------------------------------
// CREAR MASCOTA
// ------------------------------------------------------

// POST /api/mascotas
router.post(
    "/",
    auth,                       // requiere usuario logueado
    upload.single("imagen"),   // subida de imagen
    mascotaController.createMascota
);


// ------------------------------------------------------
// ACTUALIZAR MASCOTA
// ------------------------------------------------------

// PUT /api/mascotas/:id
router.put(
    "/:id",
    auth,
    upload.single("imagen"), // opcional
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