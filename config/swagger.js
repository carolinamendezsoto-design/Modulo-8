// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// swagger-jsdoc → genera documentación a partir de comentarios
const swaggerJsdoc = require("swagger-jsdoc");

// swagger-ui-express → muestra la UI en el navegador
const swaggerUi = require("swagger-ui-express");


// ------------------------------------------------------
// CONFIGURACIÓN PRINCIPAL
// ------------------------------------------------------

const options = {

    // Definición base de la API
    definition: {
        openapi: "3.0.0", // versión de OpenAPI

        info: {
            title: "Huellitas de Amor API", // nombre de tu API
            version: "1.0.0", // versión
            description: "API REST para gestión de adopción de mascotas"
        },

        servers: [
            {
                url: "http://localhost:3000", // URL local
            }
        ],

        components: {

            // 🔐 Definición de seguridad JWT
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },

        // Aplicar JWT globalmente
        security: [
            {
                bearerAuth: []
            }
        ]
    },

    // --------------------------------------------------
    // ARCHIVOS DONDE BUSCAR DOCUMENTACIÓN
    // --------------------------------------------------

    // Aquí Swagger lee tus comentarios en rutas
    apis: ["./src/routes/*.js"]
};


// ------------------------------------------------------
// GENERAR DOCUMENTACIÓN
// ------------------------------------------------------

const swaggerSpec = swaggerJsdoc(options);


// ------------------------------------------------------
// EXPORTAR
// ------------------------------------------------------

module.exports = {
    swaggerUi,
    swaggerSpec
};