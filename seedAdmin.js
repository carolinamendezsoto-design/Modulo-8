// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Cargamos variables de entorno desde el archivo .env
require("dotenv").config();

// Importamos la instancia de sequelize desde la configuración de la base de datos
const { sequelize } = require("./config/database");

// Importamos el modelo User desde la carpeta models
// Node automáticamente usa el index.js
const { User } = require("./models");

// ❌ ELIMINAMOS bcrypt
// Porque el modelo User ya encripta la contraseña automáticamente con hooks


// ------------------------------------------------------
// FUNCIÓN PRINCIPAL
// ------------------------------------------------------

// Función async para crear usuario administrador
async function crearAdmin() {

    try {

        // --------------------------------------------------
        // CONECTAR A BASE DE DATOS
        // --------------------------------------------------

        // Verificamos conexión con PostgreSQL
        await sequelize.authenticate();

        // Mensaje de éxito
        console.log("✅ Conectado a la base de datos");


        // --------------------------------------------------
        // BUSCAR SI YA EXISTE ADMIN
        // --------------------------------------------------

        // Buscamos usuario con email admin
        const adminExistente = await User.findOne({

            where: { email: "admin@admin.com" }

        });

        // Si existe → lo eliminamos
        if (adminExistente) {

            await adminExistente.destroy();

            console.log("🗑️ Admin antiguo eliminado");
        }


        // --------------------------------------------------
        // CREAR ADMIN (SIN ENCRIPTAR AQUÍ)
        // --------------------------------------------------

        // Creamos el usuario
        // ⚠️ IMPORTANTE:
        // NO usamos bcrypt aquí
        // El modelo User.beforeCreate encripta automáticamente
        const admin = await User.create({

            nombre: "Admin",                 // nombre del usuario
            email: "admin@admin.com",        // email
            password: "123456",                // password en texto plano (el modelo la encripta)
            telefono: "999999999",           // teléfono
            rol: "admin"                     // rol del sistema

        });


        // --------------------------------------------------
        // RESPUESTA EN CONSOLA
        // --------------------------------------------------

        console.log("🔥 Admin creado correctamente:");
        console.log(admin.toJSON());


        // --------------------------------------------------
        // FINALIZAR PROCESO
        // --------------------------------------------------

        process.exit(0);

    } catch (error) {

        // --------------------------------------------------
        // MANEJO DE ERRORES
        // --------------------------------------------------

        console.error("❌ Error al crear admin:", error.message);

        process.exit(1);
    }
}


// ------------------------------------------------------
// EJECUTAR SCRIPT
// ------------------------------------------------------

crearAdmin();