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
// IMPORTAR CONTROLLER
// ------------------------------------------------------

// Importamos el controlador de posts
// Aquí se encuentra la lógica de cada endpoint
const postController = require("../controllers/post.controller");


// =======================================================
// RUTAS RESTFUL DE POSTS
// =======================================================


// ------------------------------------------------------
// RUTA: OBTENER TODOS LOS POSTS (PROTEGIDA)
// ------------------------------------------------------

// Endpoint final: GET /api/posts
// Retorna todos los posts almacenados en la base de datos
router.get(
    "/",                  // ruta base
    auth,                 // middleware que valida el token
    postController.getPosts // controlador que obtiene los datos
);


// ------------------------------------------------------
// RUTA: OBTENER POST POR ID (PROTEGIDA)
// ------------------------------------------------------

// Endpoint final: GET /api/posts/:id
// Retorna un post específico según su ID
router.get(
    "/:id",
    auth,
    postController.getPostById
);


// ------------------------------------------------------
// RUTA: CREAR POST (PROTEGIDA)
// ------------------------------------------------------

// Endpoint final: POST /api/posts
// Crea un nuevo post en la base de datos
router.post(
    "/",
    auth,
    postController.createPost
);


// ------------------------------------------------------
// RUTA: ACTUALIZAR POST (PROTEGIDA)
// ------------------------------------------------------

// Endpoint final: PUT /api/posts/:id
// Actualiza un post existente según su ID
router.put(
    "/:id",
    auth,
    postController.updatePost
);


// ------------------------------------------------------
// RUTA: ELIMINAR POST (PROTEGIDA)
// ------------------------------------------------------

// Endpoint final: DELETE /api/posts/:id
// Elimina un post de la base de datos
router.delete(
    "/:id",
    auth,
    postController.deletePost
);


// ------------------------------------------------------
// EXPORTAR ROUTER
// ------------------------------------------------------

// Exportamos el router para poder usarlo en index.js
module.exports = router;