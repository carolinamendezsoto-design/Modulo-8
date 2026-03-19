// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos DataTypes desde Sequelize.
// DataTypes permite definir el tipo de datos de cada columna en la tabla.
const { DataTypes } = require("sequelize");

// Importamos la instancia de conexión a la base de datos.
// sequelize fue configurado previamente en config/database.js.
const { sequelize } = require("../config/database");

// Importamos el modelo Mascota.
// Esto permitirá crear la relación entre usuarios y mascotas.
const Mascota = require("./mascota");


// ------------------------------------------------------
// DEFINICIÓN DEL MODELO USER
// ------------------------------------------------------

// Definimos el modelo "User".
// Este modelo representa la tabla "Users" dentro de PostgreSQL.
const User = sequelize.define("User", {

    // ---------------------------------
    // ID DEL USUARIO
    // ---------------------------------

    id: {

        // Tipo de dato entero
        type: DataTypes.INTEGER,

        // Define que este campo será la clave primaria de la tabla
        primaryKey: true,

        // Hace que el valor se incremente automáticamente
        autoIncrement: true

    },


    // ---------------------------------
    // NOMBRE DEL USUARIO
    // ---------------------------------

    nombre: {

        // Tipo de dato texto (string)
        type: DataTypes.STRING,

        // Este campo es obligatorio
        allowNull: false

    },


    // ---------------------------------
    // EMAIL DEL USUARIO
    // ---------------------------------

    email: {

        // Tipo texto
        type: DataTypes.STRING,

        // Campo obligatorio
        allowNull: false,

        // No permite correos duplicados en la base de datos
        unique: true,

        // Validación automática de formato email
        validate: {
            isEmail: true
        }

    },


    // ---------------------------------
    // CONTRASEÑA DEL USUARIO
    // ---------------------------------

    password: {

        // Tipo texto
        type: DataTypes.STRING,

        // Campo obligatorio
        allowNull: false,

        // Validación de longitud mínima (mínimo 6 caracteres)
        validate: {
            len: [6, 100]
        }

    }

},

{
    // --------------------------------------------------
    // CONFIGURACIÓN DEL MODELO
    // --------------------------------------------------

    // Activa timestamps automáticos.
    // Sequelize agregará las columnas createdAt y updatedAt.
    timestamps: true

});


// ------------------------------------------------------
// RELACIÓN ENTRE MODELOS
// ------------------------------------------------------

// Definimos que un usuario puede tener muchas mascotas.
// Sequelize utilizará "userId" como clave foránea en la tabla Mascotas.
User.hasMany(Mascota, {

    // Clave foránea
    foreignKey: "userId",

    // Nombre de la relación (útil para consultas)
    as: "mascotas",

    // Si se elimina el usuario, se eliminan sus mascotas
    onDelete: "CASCADE"

});


// Definimos que cada mascota pertenece a un usuario.
// Es decir, cada mascota tiene un dueño (rescatista).
Mascota.belongsTo(User, {

    // Clave foránea
    foreignKey: "userId",

    // Nombre de la relación inversa
    as: "rescatista"

});


// ------------------------------------------------------
// EXPORTAR MODELO
// ------------------------------------------------------

// Exportamos el modelo para poder usarlo en:
// rutas, controladores o consultas a la base de datos.
module.exports = User;