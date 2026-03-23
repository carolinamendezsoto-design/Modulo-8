// ------------------------------------------------------
// IMPORTAR MODELOS
// ------------------------------------------------------

// 🔥 IMPORTANTE: usar nombres correctos
const { Mascota, User, Solicitud } = require("../models");


// ------------------------------------------------------
// OBTENER TODAS LAS MASCOTAS
// ------------------------------------------------------

const getMascotas = async () => {

    return await Mascota.findAll({

        include: [

            {
                // 🔥 DEBE COINCIDIR CON EL "as" DEL MODELO
                model: User,
                as: "rescatista",

                attributes: ["id", "nombre", "email"]
            },

            {
                model: Solicitud,
                as: "solicitudes",

                attributes: ["id", "estado"]
            }

        ]

    });
};


// ------------------------------------------------------
// OBTENER POR ID
// ------------------------------------------------------

const getMascotaById = async (id) => {

    return await Mascota.findByPk(id, {

        include: [

            {
                model: User,
                as: "rescatista",
                attributes: ["id", "nombre"]
            },

            {
                model: Solicitud,
                as: "solicitudes"
            }

        ]

    });
};


// ------------------------------------------------------
// CREAR
// ------------------------------------------------------

const createMascota = async (data) => {

    return await Mascota.create(data);
};


// ------------------------------------------------------
// ACTUALIZAR
// ------------------------------------------------------

const updateMascota = async (id, data) => {

    const mascota = await Mascota.findByPk(id);

    if (!mascota) return null;

    return await mascota.update(data);
};


// ------------------------------------------------------
// ELIMINAR
// ------------------------------------------------------

const deleteMascota = async (id) => {

    const mascota = await Mascota.findByPk(id);

    if (!mascota) return null;

    await mascota.destroy();

    return mascota;
};


// ------------------------------------------------------
// EXPORTAR
// ------------------------------------------------------

module.exports = {
    getMascotas,
    getMascotaById,
    createMascota,
    updateMascota,
    deleteMascota
};