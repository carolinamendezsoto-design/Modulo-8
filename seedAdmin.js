// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

require("dotenv").config();

const { sequelize } = require("./config/database");
const User = require("./models/user");
const bcrypt = require("bcryptjs");


// ------------------------------------------------------
// FUNCIÓN PRINCIPAL
// ------------------------------------------------------

async function crearAdmin() {

    try {

        // Conectar a la base de datos
        await sequelize.authenticate();
        console.log("✅ Conectado a la base de datos");

        // --------------------------------------------------
        // 🔥 BORRAR ADMIN SI EXISTE
        // --------------------------------------------------

        await User.destroy({
            where: { email: "admin@admin.com" }
        });

        console.log("🗑️ Admin antiguo eliminado");

        // --------------------------------------------------
        // ENCRIPTAR PASSWORD
        // --------------------------------------------------

        const passwordHash = await bcrypt.hash("1234", 10);

        // --------------------------------------------------
        // CREAR ADMIN
        // --------------------------------------------------

        const admin = await User.create({
            nombre: "Admin",
            email: "admin@admin.com",
            password: passwordHash,
            telefono: "999999999",
            rol: "admin"
        });

        console.log("🔥 Admin creado correctamente:");
        console.log(admin.toJSON());

        process.exit();

    } catch (error) {

        console.error("❌ Error:", error);
        process.exit(1);
    }
}


// ------------------------------------------------------
// EJECUTAR
// ------------------------------------------------------

crearAdmin();