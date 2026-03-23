-- -----------------------------------------------------
-- CREAR TABLA USERS
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS users (

    id SERIAL PRIMARY KEY,

    nombre VARCHAR(100) NOT NULL,

    email VARCHAR(150) UNIQUE NOT NULL,

    password VARCHAR(255) NOT NULL,

    telefono VARCHAR(20),

    rol VARCHAR(20) NOT NULL DEFAULT 'adoptante',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- -----------------------------------------------------
-- CREAR TABLA MASCOTAS (🔥 CORREGIDA)
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS mascotas (

    id SERIAL PRIMARY KEY,

    nombre VARCHAR(100) NOT NULL,

    -- 🔥 NUEVO
    raza VARCHAR(100) NOT NULL,

    -- 🔥 FIX: ahora STRING
    edad VARCHAR(50) NOT NULL,

    descripcion TEXT NOT NULL,

    energia VARCHAR(20),

    porte VARCHAR(20),

    estado VARCHAR(20) DEFAULT 'disponible',

    imagen VARCHAR(255),

    usuario_id INTEGER,

    CONSTRAINT fk_mascota_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES users(id)
        ON DELETE SET NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- -----------------------------------------------------
-- CREAR TABLA SOLICITUDES
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS solicitudes (

    id SERIAL PRIMARY KEY,

    usuario_id INTEGER NOT NULL,

    mascota_id INTEGER NOT NULL,

    estado VARCHAR(20) DEFAULT 'pendiente',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_solicitud_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_solicitud_mascota
        FOREIGN KEY (mascota_id)
        REFERENCES mascotas(id)
        ON DELETE CASCADE,

    CONSTRAINT unique_solicitud UNIQUE (usuario_id, mascota_id)
);