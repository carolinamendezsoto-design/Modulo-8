-- -----------------------------------------------------
-- CREAR TABLA USERS
-- -----------------------------------------------------

-- Creamos la tabla de usuarios si no existe
CREATE TABLE IF NOT EXISTS users (

    -- ID único autoincremental
    id SERIAL PRIMARY KEY,

    -- Nombre del usuario (obligatorio)
    nombre VARCHAR(100) NOT NULL,

    -- Email único (no se puede repetir)
    email VARCHAR(150) UNIQUE NOT NULL,

    -- Contraseña encriptada
    password VARCHAR(255) NOT NULL,

    -- Teléfono (opcional pero útil)
    telefono VARCHAR(20),

    -- Rol del usuario (🔥 CLAVE EN TU PROYECTO)
    rol VARCHAR(20) NOT NULL DEFAULT 'adoptante',

    -- Fecha de creación automática
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- -----------------------------------------------------
-- CREAR TABLA MASCOTAS
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS mascotas (

    -- ID único
    id SERIAL PRIMARY KEY,

    -- Nombre de la mascota
    nombre VARCHAR(100) NOT NULL,

    -- Edad (en años o meses)
    edad INTEGER NOT NULL,

    -- Descripción
    descripcion TEXT NOT NULL,

    -- Nivel de energía (Baja, Media, Alta)
    energia VARCHAR(20),

    -- Tamaño (Pequeña, Mediana, Grande)
    porte VARCHAR(20),

    -- Estado de adopción (🔥 CLAVE)
    estado VARCHAR(20) DEFAULT 'disponible',

    -- Imagen (ruta del archivo)
    imagen VARCHAR(255),

    -- Usuario que la publicó (rescatista)
    usuario_id INTEGER,

    -- Clave foránea
    CONSTRAINT fk_mascota_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES users(id)
        ON DELETE SET NULL,

    -- Fecha de creación
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- -----------------------------------------------------
-- CREAR TABLA SOLICITUDES
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS solicitudes (

    -- ID único
    id SERIAL PRIMARY KEY,

    -- Usuario que postula
    usuario_id INTEGER NOT NULL,

    -- Mascota a la que postula
    mascota_id INTEGER NOT NULL,

    -- Estado de la solicitud (pendiente, aprobada, rechazada)
    estado VARCHAR(20) DEFAULT 'pendiente',

    -- Fecha de creación
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- -------------------------------------------------
    -- RELACIONES
    -- -------------------------------------------------

    -- Relación con usuario
    CONSTRAINT fk_solicitud_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    -- Relación con mascota
    CONSTRAINT fk_solicitud_mascota
        FOREIGN KEY (mascota_id)
        REFERENCES mascotas(id)
        ON DELETE CASCADE,

    -- -------------------------------------------------
    -- RESTRICCIÓN ÚNICA (🔥 NIVEL PRO)
    -- -------------------------------------------------

    -- Evita que un usuario postule 2 veces a la misma mascota
    CONSTRAINT unique_solicitud UNIQUE (usuario_id, mascota_id)
);