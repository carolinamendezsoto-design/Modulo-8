// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos Express para poder crear rutas HTTP
const express = require("express");

// Creamos una instancia del router de Express
// Esto permite definir rutas separadas del archivo principal (index.js)
const router = express.Router();


// ------------------------------------------------------
// IMPORTAR MIDDLEWARE DE AUTENTICACIÓN
// ------------------------------------------------------

// Importamos el middleware que valida el token JWT
// Este middleware protegerá las rutas privadas
const auth = require("../middlewares/auth");


// ------------------------------------------------------
// IMPORTAR MIDDLEWARE DE SUBIDA DE ARCHIVOS
// ------------------------------------------------------

// Importamos multer configurado (upload)
// Se usará para subir imágenes de mascotas
const upload = require("../middlewares/upload");


// ------------------------------------------------------
// IMPORTAR CONTROLLER
// ------------------------------------------------------

// Importamos el controlador de mascotas
// Aquí se encuentra la lógica de cada endpoint
const mascotaController = require("../controllers/mascota.controller");


// =======================================================
// RUTAS RESTFUL DE MASCOTAS
// =======================================================


// ------------------------------------------------------
// RUTA: OBTENER TODAS LAS MASCOTAS (PROTEGIDA)
// ------------------------------------------------------

// Endpoint final: GET /api/mascotas
// Retorna todas las mascotas registradas
router.get(
    "/",                        // ruta base
    auth,                       // middleware que valida el token
    mascotaController.getMascotas // controlador que obtiene los datos
);


// ------------------------------------------------------
// RUTA: OBTENER MASCOTA POR ID (PROTEGIDA)
// ------------------------------------------------------

// Endpoint final: GET /api/mascotas/:id
// Retorna una mascota específica según su ID
router.get(
    "/:id",                     // parámetro dinámico (id)
    auth,                       // protección con token
    mascotaController.getMascotaById // controlador
);


// ------------------------------------------------------
// RUTA: CREAR MASCOTA (PROTEGIDA)
// ------------------------------------------------------

// Endpoint final: POST /api/mascotas
// Crea una nueva mascota en la base de datos
router.post(
    "/",                        // ruta base
    auth,                       // usuario debe estar autenticado
    upload.single("imagen"),    // middleware para subir imagen (campo "imagen")
    mascotaController.createMascota // controlador que crea la mascota
);


// ------------------------------------------------------
// RUTA: ACTUALIZAR MASCOTA (PROTEGIDA)
// ------------------------------------------------------

// Endpoint final: PUT /api/mascotas/:id
// Actualiza una mascota existente según su ID
router.put(
    "/:id",                     // id de la mascota
    auth,                       // protección con token
    upload.single("imagen"),    // permite actualizar imagen
    mascotaController.updateMascota // controlador
);


// ------------------------------------------------------
// RUTA: ELIMINAR MASCOTA (PROTEGIDA)
// ------------------------------------------------------

// Endpoint final: DELETE /api/mascotas/:id
// Elimina una mascota de la base de datos
router.delete(
    "/:id",                     // id de la mascota
    auth,                       // protección con token
    mascotaController.deleteMascota // controlador
);


// ------------------------------------------------------
// EXPORTAR ROUTER
// ------------------------------------------------------

// Exportamos el router para poder usarlo en index.js
module.exports = router;