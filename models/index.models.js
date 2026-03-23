// ------------------------------------------------------
// IMPORTAR MODELOS
// ------------------------------------------------------

// 🔥 IMPORTANTE: nombres consistentes (sin .models si no lo usas en todos)

// Modelo de usuarios
const User = require("./user");

// Modelo de mascotas
const Mascota = require("./mascota");

// Modelo de solicitudes (tabla intermedia)
const Solicitud = require("./solicitud");


// ------------------------------------------------------
// RELACIÓN 1:N → USER (RESCATISTA) → MASCOTAS
// ------------------------------------------------------

// Un usuario puede tener muchas mascotas
User.hasMany(Mascota, {
    foreignKey: "userId",   // FK en Mascota
    as: "mascotas",         // alias para includes
    onDelete: "CASCADE",    // si se elimina usuario → elimina mascotas
    onUpdate: "CASCADE"
});

// Cada mascota pertenece a un usuario (rescatista)
Mascota.belongsTo(User, {
    foreignKey: "userId",
    as: "rescatista",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});


// ------------------------------------------------------
// RELACIÓN N:M → ADOPTANTE ↔ MASCOTAS (VÍA SOLICITUD)
// ------------------------------------------------------

// Usuario (adoptante) puede postular a muchas mascotas
User.belongsToMany(Mascota, {
    through: Solicitud,         // tabla intermedia
    foreignKey: "adoptanteId",  // FK en Solicitud
    otherKey: "mascotaId",      // FK inversa
    as: "postulaciones",        // alias
    onDelete: "CASCADE"
});

// Mascota puede tener muchos adoptantes interesados
Mascota.belongsToMany(User, {
    through: Solicitud,
    foreignKey: "mascotaId",
    otherKey: "adoptanteId",
    as: "interesados",
    onDelete: "CASCADE"
});


// ------------------------------------------------------
// RELACIONES DIRECTAS (MUY IMPORTANTE)
// ------------------------------------------------------

// 🔥 Esto permite hacer includes directos y queries más claros

// Solicitud → Usuario (adoptante)
Solicitud.belongsTo(User, {
    foreignKey: "adoptanteId",
    as: "adoptante",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

// Usuario → Solicitudes
User.hasMany(Solicitud, {
    foreignKey: "adoptanteId",
    as: "solicitudes",
    onDelete: "CASCADE"
});


// Solicitud → Mascota
Solicitud.belongsTo(Mascota, {
    foreignKey: "mascotaId",
    as: "mascota",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

// Mascota → Solicitudes
Mascota.hasMany(Solicitud, {
    foreignKey: "mascotaId",
    as: "solicitudes",
    onDelete: "CASCADE"
});


// ------------------------------------------------------
// EXPORTAR MODELOS CENTRALIZADOS
// ------------------------------------------------------

// 🔥 Esto permite importar TODO desde un solo lugar

module.exports = {
    User,
    Mascota,
    Solicitud
};