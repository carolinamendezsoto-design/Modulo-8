// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Cargamos variables de entorno (.env)
require("dotenv").config();

// Importamos sequelize desde la configuración de la DB
const { sequelize } = require("./config/database");

// Importamos el modelo User (⚠️ idealmente desde index de models)
const { User } = require("./models");

// Librería para encriptar contraseñas
const bcrypt = require("bcryptjs");


// ------------------------------------------------------
// FUNCIÓN PRINCIPAL
// ------------------------------------------------------

// Función asincrónica para crear admin
async function crearAdmin() {

    try {

        // --------------------------------------------------
        // CONECTAR A BASE DE DATOS
        // --------------------------------------------------

        // Verificamos conexión con la DB
        await sequelize.authenticate();

        console.log("✅ Conectado a la base de datos");


        // --------------------------------------------------
        // VERIFICAR SI YA EXISTE ADMIN
        // --------------------------------------------------

        // Buscamos si ya existe un admin con ese email
        const adminExistente = await User.findOne({
            where: { email: "admin@admin.com" }
        });

        // Si existe, lo eliminamos (para evitar duplicados)
        if (adminExistente) {

            await adminExistente.destroy();

            console.log("🗑️ Admin antiguo eliminado");
        }


        // --------------------------------------------------
        // ENCRIPTAR PASSWORD
        // --------------------------------------------------

        // Encriptamos la contraseña con bcrypt (salt 10)
        const passwordHash = await bcrypt.hash("1234", 10);


        // --------------------------------------------------
        // CREAR NUEVO ADMIN
        // --------------------------------------------------

        const admin = await User.create({

            // Nombre del usuario
            nombre: "Admin",

            // Email único
            email: "admin@admin.com",

            // Password encriptada
            password: passwordHash,

            // Teléfono (opcional)
            telefono: "999999999",

            // Rol (🔥 clave en tu sistema)
            rol: "admin"
        });


        // --------------------------------------------------
        // RESPUESTA EN CONSOLA
        // --------------------------------------------------

        console.log("🔥 Admin creado correctamente:");

        // Mostramos el objeto limpio
        console.log(admin.toJSON());


        // --------------------------------------------------
        // FINALIZAR PROCESO
        // --------------------------------------------------

        // Terminamos ejecución correctamente
        process.exit(0);

    } catch (error) {

        // --------------------------------------------------
        // MANEJO DE ERRORES
        // --------------------------------------------------

        console.error("❌ Error al crear admin:", error.message);

        // Terminamos ejecución con error
        process.exit(1);
    }
}


// ------------------------------------------------------
// EJECUTAR SCRIPT
// ------------------------------------------------------

// Llamamos a la función principal
crearAdmin();