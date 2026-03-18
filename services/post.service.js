// ------------------------------------------------------
// IMPORTAR MODELO
// ------------------------------------------------------

// Importamos el modelo Post (tabla en la base de datos)
const Post = require("../models/post");


// ------------------------------------------------------
// OBTENER TODOS LOS POSTS
// ------------------------------------------------------

// Función que obtiene todos los posts
// Recibe query por si en el futuro agregas filtros
const getPosts = async (query) => {

    // --------------------------------------------------
    // CONSULTA A BASE DE DATOS
    // --------------------------------------------------

    // Buscamos todos los posts en la base de datos
    const posts = await Post.findAll();

    // --------------------------------------------------
    // RESPUESTA
    // --------------------------------------------------

    // Retornamos una respuesta estructurada
    return {
        status: "success",                        // indica éxito
        message: "Posts obtenidos correctamente", // mensaje
        data: posts                               // datos obtenidos
    };
};


// ------------------------------------------------------
// OBTENER POST POR ID
// ------------------------------------------------------

// Recibe un objeto con el id (desde params)
const getPostById = async ({ id }) => {

    // Buscamos el post por su ID
    const post = await Post.findByPk(id);

    // Si no existe → error 404 (no encontrado)
    if (!post) {
        const error = new Error("Post no encontrado"); // mensaje
        error.statusCode = 404; // código HTTP correcto
        throw error; // lanzamos error
    }

    // Retornamos respuesta
    return {
        status: "success",
        message: "Post obtenido correctamente",
        data: post
    };
};


// ------------------------------------------------------
// CREAR POST
// ------------------------------------------------------

// Recibe los datos del body
const createPost = async (data) => {

    // Validamos que tenga título
    // Si no → error 400 (datos inválidos)
    if (!data.title) {
        const error = new Error("El título es obligatorio"); // mensaje
        error.statusCode = 400; // bad request
        throw error;
    }

    // Creamos el post en la base de datos
    const post = await Post.create(data);

    // Retornamos respuesta
    return {
        status: "success",
        message: "Post creado correctamente",
        data: post
    };
};


// ------------------------------------------------------
// ACTUALIZAR POST
// ------------------------------------------------------

// Recibe un objeto con id y data
const updatePost = async ({ id, data }) => {

    // Buscamos el post
    const post = await Post.findByPk(id);

    // Si no existe → error 404
    if (!post) {
        const error = new Error("Post no encontrado");
        error.statusCode = 404;
        throw error;
    }

    // Actualizamos el post
    const updated = await post.update(data);

    // Retornamos respuesta
    return {
        status: "success",
        message: "Post actualizado correctamente",
        data: updated
    };
};


// ------------------------------------------------------
// ELIMINAR POST
// ------------------------------------------------------

// Recibe un objeto con id
const deletePost = async ({ id }) => {

    // Buscamos el post
    const post = await Post.findByPk(id);

    // Si no existe → error 404
    if (!post) {
        const error = new Error("Post no encontrado");
        error.statusCode = 404;
        throw error;
    }

    // Eliminamos el post
    await post.destroy();

    // Retornamos confirmación
    return {
        status: "success",
        message: "Post eliminado correctamente"
    };
};


// ------------------------------------------------------
// EXPORTAR SERVICIO
// ------------------------------------------------------

module.exports = {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
};