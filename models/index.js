// ------------------------------------------------------
// IMPORTAR MODELOS
// ------------------------------------------------------

// Importamos modelo de usuario
const User = require("./user.model");

// Importamos modelo de mascota
const Mascota = require("./mascota.model");

// Importamos modelo de solicitud (tabla intermedia)
const Solicitud = require("./solicitud.model");


// ------------------------------------------------------
// RELACIÓN USER → MASCOTAS (1:N)
// ------------------------------------------------------

// Un usuario (rescatista) puede tener muchas mascotas
User.hasMany(Mascota, {

    foreignKey: "userId",   // Clave foránea en tabla Mascota

    as: "mascotas",         // Alias para include

    onDelete: "CASCADE",    // Si se elimina usuario → elimina sus mascotas

    onUpdate: "CASCADE"     // Si cambia ID → actualiza en cascada
});


// Cada mascota pertenece a un usuario (rescatista)
Mascota.belongsTo(User, {

    foreignKey: "userId",   // FK en Mascota

    as: "rescatista",       // Alias para include

    onDelete: "CASCADE",

    onUpdate: "CASCADE"
});


// ------------------------------------------------------
// RELACIÓN N:M (POSTULACIONES)
// ------------------------------------------------------

// Usuario (adoptante) puede postular a muchas mascotas
User.belongsToMany(Mascota, {

    through: Solicitud,     // Tabla intermedia

    foreignKey: "adoptanteId", // FK hacia usuario

    otherKey: "mascotaId",  // FK hacia mascota

    as: "postulaciones",    // Alias

    onDelete: "CASCADE"
});


// Mascota puede tener muchos interesados
Mascota.belongsToMany(User, {

    through: Solicitud,

    foreignKey: "mascotaId",

    otherKey: "adoptanteId",

    as: "interesados",

    onDelete: "CASCADE"
});


// ------------------------------------------------------
// 🔥 RELACIONES DIRECTAS (CLAVE)
// ------------------------------------------------------

// Solicitud pertenece a un usuario (adoptante)
Solicitud.belongsTo(User, {

    foreignKey: "adoptanteId", // 🔥 clave correcta

    as: "adoptante"            // 🔥 alias usado en frontend
});


// Usuario tiene muchas solicitudes
User.hasMany(Solicitud, {

    foreignKey: "adoptanteId",

    as: "solicitudes"
});


// Solicitud pertenece a una mascota
Solicitud.belongsTo(Mascota, {

    foreignKey: "mascotaId",

    as: "mascota"
});


// Mascota tiene muchas solicitudes
Mascota.hasMany(Solicitud, {

    foreignKey: "mascotaId",

    as: "solicitudes"
});


// ------------------------------------------------------
// EXPORTAR
// ------------------------------------------------------

module.exports = {

    User,

    Mascota,

    Solicitud
};