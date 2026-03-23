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

// Un usuario puede tener muchas mascotas
User.hasMany(Mascota, {
    foreignKey: "userId",      // FK en Mascota
    as: "mascotas",            // Alias para include
    onDelete: "CASCADE",       // Borra mascotas si se elimina usuario
    onUpdate: "CASCADE"
});

// Cada mascota pertenece a un usuario (rescatista)
Mascota.belongsTo(User, {
    foreignKey: "userId",
    as: "rescatista",          // 🔥 ESTE ALIAS ES CLAVE
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});


// ------------------------------------------------------
// RELACIÓN N:M (ADOPCIÓN)
// ------------------------------------------------------

// Usuario (adoptante) puede postular a muchas mascotas
User.belongsToMany(Mascota, {
    through: Solicitud,        // Tabla intermedia
    foreignKey: "adoptanteId",
    otherKey: "mascotaId",
    as: "postulaciones",
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
// RELACIONES DIRECTAS (CLAVE PARA INCLUDE)
// ------------------------------------------------------

// Solicitud pertenece a usuario (adoptante)
Solicitud.belongsTo(User, {
    foreignKey: "adoptanteId",
    as: "adoptante"
});

// Usuario tiene muchas solicitudes
User.hasMany(Solicitud, {
    foreignKey: "adoptanteId",
    as: "solicitudes"
});

// Solicitud pertenece a mascota
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
// EXPORTAR (CONSISTENTE)
// ------------------------------------------------------

module.exports = {
    User,
    Mascota,
    Solicitud
};