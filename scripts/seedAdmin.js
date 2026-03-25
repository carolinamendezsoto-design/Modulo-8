// ------------------------------------------------------
// IMPORTAR VARIABLES DE ENTORNO
// ------------------------------------------------------

// Cargamos variables desde el archivo .env (DB, JWT, etc.)
require("dotenv").config();


// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos sequelize para conectar a la base de datos
const { sequelize } = require("./config/database");

// Importamos el modelo User desde models/index.js
const { User } = require("./models");

// Importamos bcrypt para encriptar contraseñas manualmente
const bcrypt = require("bcryptjs");


// ------------------------------------------------------
// FUNCIÓN PRINCIPAL
// ------------------------------------------------------

// Definimos función async para poder usar await
async function crearAdmin() {

    try {

        // --------------------------------------------------
        // CONECTAR A BASE DE DATOS
        // --------------------------------------------------

        // Verificamos conexión con PostgreSQL
        await sequelize.authenticate();

        // Mensaje en consola si conecta correctamente
        console.log("✅ DB conectada correctamente");


        // --------------------------------------------------
        // BUSCAR ADMIN EXISTENTE
        // --------------------------------------------------

        // Buscamos si ya existe un admin con ese email
        const existing = await User.findOne({
            where: { email: "admin@admin.com" }
        });


        // Si existe → lo eliminamos para evitar duplicados
        if (existing) {

            // Eliminamos registro existente
            await existing.destroy();

            // Log informativo
            console.log("🗑️ Admin anterior eliminado");
        }


        // --------------------------------------------------
        // ENCRIPTAR PASSWORD (CLAVE DEL SISTEMA)
        // --------------------------------------------------

        // Generamos hash de la contraseña "123456"
        // El 10 es el salt (nivel de seguridad)
        const hashedPassword = await bcrypt.hash("123456", 10);


        // --------------------------------------------------
        // CREAR ADMIN
        // --------------------------------------------------

        // Creamos nuevo usuario admin en la base de datos
        const admin = await User.create({

            // Nombre del usuario
            nombre: "Admin",

            // Email único
            email: "admin@admin.com",

            // Password encriptado (🔥 nunca guardar texto plano)
            password: hashedPassword,

            // Teléfono de ejemplo
            telefono: "999999999",

            // Rol del sistema
            rol: "admin"
        });


        // --------------------------------------------------
        // RESPUESTA EN CONSOLA
        // --------------------------------------------------

        // Mostramos confirmación
        console.log("🔥 Admin creado correctamente:", admin.email);


        // --------------------------------------------------
        // FINALIZAR SCRIPT
        // --------------------------------------------------

        // Terminamos proceso correctamente
        process.exit(0);

    } catch (error) {

        // --------------------------------------------------
        // MANEJO DE ERRORES
        // --------------------------------------------------

        // Mostramos error en consola
        console.error("❌ Error al crear admin:", error.message);

        // Terminamos proceso con error
        process.exit(1);
    }
}


// ------------------------------------------------------
// EJECUTAR FUNCIÓN
// ------------------------------------------------------

// Llamamos a la función para ejecutar el script
crearAdmin();