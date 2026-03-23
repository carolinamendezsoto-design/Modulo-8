# 🐾 Huellitas de Amor API

Backend desarrollado con Node.js y Express para gestionar la adopción de mascotas 💛

---

## 🌸 Sobre el proyecto

**Huellitas de Amor** es una API que permite:

- Registrar e iniciar sesión de usuarios
- Publicar mascotas en adopción
- Postular a mascotas
- Gestionar solicitudes de adopción
- Subir imágenes de mascotas

Este proyecto fue desarrollado como parte del módulo final de backend, integrando todo lo aprendido 💻✨

---

## 🛠️ Tecnologías usadas

- Node.js
- Express
- Sequelize
- PostgreSQL
- JWT (autenticación)
- Multer (subida de imágenes)
- bcryptjs
- dotenv
- CORS

---

## 📁 Estructura del proyecto


src/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
├── uploads/
├── public/
├── app.js
├── server.js


---

## ⚙️ Instalación

1. Clonar repositorio:


git clone https://github.com/carolinamendezsoto-design/Modulo-8.git

cd Modulo-8


2. Instalar dependencias:


npm install


3. Crear archivo `.env`:


PORT=3000
DB_NAME=tu_base
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_HOST=localhost
JWT_SECRET=secreto


---

## ▶️ Ejecutar proyecto


npm run dev


Servidor en:


http://localhost:3000


---

## 🔐 Autenticación

### Login


POST /api/auth/login


Body:

```json
{
  "email": "correo@email.com",
  "password": "123456"
}

Respuesta:

{
  "status": "success",
  "message": "Login exitoso",
  "data": {
    "token": "TU_TOKEN"
  }
}
🔑 Uso del token

Agregar en headers:

Authorization: Bearer TU_TOKEN
📡 Endpoints principales
👤 Usuarios
GET /api/users
POST /api/users
DELETE /api/users/:id
🐶 Mascotas
GET /api/mascotas
POST /api/mascotas
PUT /api/mascotas/:id
DELETE /api/mascotas/:id
📄 Solicitudes
POST /api/solicitudes
GET /api/solicitudes
PUT /api/solicitudes/:id
📤 Subida de imágenes
POST /api/upload
Tipo: multipart/form-data
Campo: imagen
Máximo: 5MB
Formatos: JPG, PNG, WEBP
🛡️ Seguridad
Autenticación con JWT
Rutas protegidas
Control de roles
Validación de archivos
Manejo global de errores
⚠️ Manejo de errores

Todas las respuestas tienen formato:

{
  "status": "error",
  "message": "Descripción del error",
  "data": null
}
💡 Lo que aprendí

En este proyecto aprendí a:

Crear una API RESTful
Usar Sequelize y relaciones entre tablas
Implementar autenticación con JWT
Subir archivos con Multer
Organizar un backend en capas (routes, controllers, services)
💛 Autor

Carolina Méndez Soto

Proyecto final módulo 8


🐾 Estado del proyecto

✔ Funcional
✔ API completa
✔ Lista para conectar con frontend