// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos express para poder definir rutas HTTP
const express = require("express");

// Creamos una instancia del router
const router = express.Router();


// ------------------------------------------------------
// IMPORTAR CONTROLADOR
// ------------------------------------------------------

// Importamos el controlador de mascotas
// Aquí está toda la lógica de negocio
const mascotaController = require("../controllers/mascota.controller");


// ------------------------------------------------------
// IMPORTAR MIDDLEWARES
// ------------------------------------------------------

// Middleware de autenticación (valida JWT)
const auth = require("../middlewares/auth.middleware");

// Middleware de subida de archivos (multer)
const upload = require("../middlewares/upload.middleware");


// ------------------------------------------------------
// RUTAS
// ------------------------------------------------------


// =======================================================
// MATCH DE MASCOTAS (🔥 DEBE IR PRIMERO)
// =======================================================

// ⚠️ IMPORTANTE:
// Esta ruta va antes de "/:id"
// porque si no, Express interpreta "match" como un id

// Endpoint: GET /api/mascotas/match/filtro
router.get(
    "/match/filtro",                    // ruta específica
    mascotaController.getMatchMascotas // controller
);


// =======================================================
// OBTENER TODAS LAS MASCOTAS
// =======================================================

// Endpoint: GET /api/mascotas
router.get(
    "/",                              // ruta base
    mascotaController.getMascotas     // controller
);


// =======================================================
// OBTENER MASCOTA POR ID
// =======================================================

// Endpoint: GET /api/mascotas/:id
router.get(
    "/:id",                           // parámetro dinámico
    mascotaController.getMascotaById // controller
);


// =======================================================
// CREAR MASCOTA (CON IMAGEN)
// =======================================================

// Endpoint: POST /api/mascotas
router.post(
    "/",                              // ruta base
    auth,                             // requiere token
    upload.single("imagen"),          // multer → sube imagen
    mascotaController.createMascota   // controller
);


// =======================================================
// ACTUALIZAR MASCOTA
// =======================================================

// Endpoint: PUT /api/mascotas/:id
router.put(
    "/:id",                           // id de la mascota
    auth,                             // protegido
    upload.single("imagen"),          // opcional nueva imagen
    mascotaController.updateMascota   // controller
);


// =======================================================
// ELIMINAR MASCOTA
// =======================================================

// Endpoint: DELETE /api/mascotas/:id
router.delete(
    "/:id",                           // id de la mascota
    auth,                             // protegido
    mascotaController.deleteMascota   // controller
);


// ------------------------------------------------------
// EXPORTAR ROUTER
// ------------------------------------------------------

// Exportamos el router para usarlo en index.js
module.exports = router;