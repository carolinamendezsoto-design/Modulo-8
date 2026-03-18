// ------------------------------------------------------
// IMPORTAR SERVICE
// ------------------------------------------------------

// Importamos la lógica de negocio de posts
const postService = require("../services/post.service");


// ------------------------------------------------------
// OBTENER TODOS LOS POSTS
// ------------------------------------------------------

// Controlador que maneja GET /api/posts
const getPosts = async (req, res, next) => {
    try {

        // Llamamos al servicio (le pasamos query por si luego agregas filtros)
        const result = await postService.getPosts(req.query);

        // Respondemos directamente lo que devuelve el service
        res.json(result);

    } catch (error) {
        next(error); // delegamos error
    }
};


// ------------------------------------------------------
// OBTENER POST POR ID
// ------------------------------------------------------

// Controlador que maneja GET /api/posts/:id
const getPostById = async (req, res, next) => {
    try {

        // Enviamos params completos al service
        const result = await postService.getPostById(req.params);

        // Respondemos
        res.json(result);

    } catch (error) {
        next(error);
    }
};


// ------------------------------------------------------
// CREAR POST
// ------------------------------------------------------

// Controlador que maneja POST /api/posts
const createPost = async (req, res, next) => {
    try {

        // Enviamos body completo al service
        const result = await postService.createPost(req.body);

        // Respondemos (el service debería manejar el status 201 si quieres nivel pro)
        res.status(201).json(result);

    } catch (error) {
        next(error);
    }
};


// ------------------------------------------------------
// ACTUALIZAR POST
// ------------------------------------------------------

// Controlador que maneja PUT /api/posts/:id
const updatePost = async (req, res, next) => {
    try {

        // Enviamos todo junto (params + body)
        const result = await postService.updatePost({
            id: req.params.id,
            data: req.body
        });

        // Respondemos
        res.json(result);

    } catch (error) {
        next(error);
    }
};


// ------------------------------------------------------
// ELIMINAR POST
// ------------------------------------------------------

// Controlador que maneja DELETE /api/posts/:id
const deletePost = async (req, res, next) => {
    try {

        // Enviamos el id al service
        const result = await postService.deletePost(req.params);

        // Respondemos
        res.json(result);

    } catch (error) {
        next(error);
    }
};


// ------------------------------------------------------
// EXPORTAR CONTROLADOR
// ------------------------------------------------------

module.exports = {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
};