// ------------------------------------------------------
// IMPORTAR MODELOS
// ------------------------------------------------------

// Importamos modelo de usuario
const User = require("./user.models");

// Importamos modelo de mascota
const Mascota = require("./mascota.models");

// Importamos modelo de solicitud
const Solicitud = require("./solicitud.models");


// ------------------------------------------------------
// RELACIÓN 1:N (USUARIO → MASCOTAS)
// ------------------------------------------------------

// Un usuario (rescatista) puede tener muchas mascotas
User.hasMany(Mascota, {
    foreignKey: "userId", // clave foránea en Mascota
    as: "mascotas"        // alias para consultas
});

// Una mascota pertenece a un usuario
Mascota.belongsTo(User, {
    foreignKey: "userId", // clave foránea
    as: "rescatista"      // alias
});


// ------------------------------------------------------
// RELACIÓN N:M (ADOPTANTES ↔ MASCOTAS)
// ------------------------------------------------------

// Un usuario (adoptante) puede postular a muchas mascotas
User.belongsToMany(Mascota, {
    through: Solicitud,        // tabla intermedia
    foreignKey: "adoptanteId", // FK en Solicitud
    otherKey: "mascotaId",     // FK inversa
    as: "postulaciones"        // alias
});

// Una mascota puede tener muchos adoptantes interesados
Mascota.belongsToMany(User, {
    through: Solicitud,        // tabla intermedia
    foreignKey: "mascotaId",   // FK en Solicitud
    otherKey: "adoptanteId",   // FK inversa
    as: "interesados"          // alias
});


// ------------------------------------------------------
// RELACIONES DIRECTAS (SOLICITUD)
// ------------------------------------------------------

// Cada solicitud pertenece a un usuario (adoptante)
Solicitud.belongsTo(User, {
    foreignKey: "adoptanteId", // FK
    as: "adoptante",           // alias
    onDelete: "CASCADE"        // elimina solicitudes si se borra usuario
});

// Cada solicitud pertenece a una mascota
Solicitud.belongsTo(Mascota, {
    foreignKey: "mascotaId",   // FK
    as: "mascota",             // alias
    onDelete: "CASCADE"        // elimina solicitudes si se borra mascota
});


// ------------------------------------------------------
// EXPORTAR MODELOS
// ------------------------------------------------------

// Exportamos todos los modelos centralizados
module.exports = {
    User,
    Mascota,
    Solicitud
};