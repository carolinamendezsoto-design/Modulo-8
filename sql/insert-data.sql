-- -----------------------------------------------------
-- INSERTAR USUARIOS DE PRUEBA
-- -----------------------------------------------------

-- ⚠️ IMPORTANTE:
-- Estas contraseñas deberían estar encriptadas (bcrypt)
-- Aquí son solo para pruebas iniciales

INSERT INTO users (nombre, email, password, telefono, rol)
VALUES

-- Admin
('Carolina', 'caro@email.com', '$2a$10$hashdemo123456789', '987654321', 'admin'),

-- Rescatista
('Juan', 'juan@email.com', '$2a$10$hashdemo123456789', '912345678', 'rescatista'),

-- Adoptante
('Pedro', 'pedro@email.com', '$2a$10$hashdemo123456789', '923456789', 'adoptante');



-- -----------------------------------------------------
-- INSERTAR MASCOTAS
-- -----------------------------------------------------

INSERT INTO mascotas (nombre, edad, descripcion, energia, porte, estado, usuario_id)
VALUES

-- Mascota 1
('Luna', 2, 'Perrita muy cariñosa y juguetona', 'Alta', 'Mediana', 'disponible', 2),

-- Mascota 2
('Max', 4, 'Perro tranquilo ideal para departamento', 'Baja', 'Pequeña', 'disponible', 2),

-- Mascota 3
('Rocky', 3, 'Activo y le encanta correr', 'Alta', 'Grande', 'disponible', 2);



-- -----------------------------------------------------
-- INSERTAR SOLICITUDES
-- -----------------------------------------------------

INSERT INTO solicitudes (usuario_id, mascota_id, estado)
VALUES

-- Pedro postula a Luna
(3, 1, 'pendiente'),

-- Pedro postula a Max
(3, 2, 'pendiente'),

-- Pedro postula a Rocky
(3, 3, 'pendiente');