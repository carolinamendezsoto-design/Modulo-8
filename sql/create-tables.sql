-- -----------------------------------------------------
-- CREAR TABLA USERS (POSTGRESQL)
-- -----------------------------------------------------

-- Creamos la tabla users si no existe
CREATE TABLE IF NOT EXISTS users (

    -- ID autoincremental (en PostgreSQL se usa SERIAL)
    id SERIAL PRIMARY KEY,

    -- Nombre del usuario (obligatorio)
    nombre VARCHAR(100) NOT NULL,

    -- Email único (no se puede repetir)
    email VARCHAR(150) UNIQUE NOT NULL,

    -- Contraseña (se almacenará encriptada desde el backend)
    password VARCHAR(255) NOT NULL,

    -- Fecha de creación automática
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);