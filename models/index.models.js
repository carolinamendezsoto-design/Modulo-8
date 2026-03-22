const User = require("./user");
const Mascota = require("./mascota.models");
const Solicitud = require("./solicitud");


// ------------------------------------------------------
// RELACIONES 1:N
// ------------------------------------------------------

// Usuario (rescatista) → Mascotas
User.hasMany(Mascota, { foreignKey: "userId", as: "mascotas" });
Mascota.belongsTo(User, { foreignKey: "userId", as: "rescatista" });


// ------------------------------------------------------
// RELACIÓN N:M (🔥 CLAVE PARA EL 7)
// ------------------------------------------------------

// Usuario (adoptante) ↔ Mascota (a través de Solicitud)

User.belongsToMany(Mascota, {
    through: Solicitud,
    foreignKey: "adoptanteId",
    otherKey: "mascotaId",
    as: "postulaciones"
});

Mascota.belongsToMany(User, {
    through: Solicitud,
    foreignKey: "mascotaId",
    otherKey: "adoptanteId",
    as: "interesados"
});


// ------------------------------------------------------
// RELACIONES DIRECTAS
// ------------------------------------------------------

Solicitud.belongsTo(User, {
    foreignKey: "adoptanteId",
    as: "adoptante",
    onDelete: "CASCADE"
});

Solicitud.belongsTo(Mascota, {
    foreignKey: "mascotaId",
    as: "mascota",
    onDelete: "CASCADE"
});


// ------------------------------------------------------

module.exports = {
    User,
    Mascota,
    Solicitud
};