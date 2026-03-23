# 🐾 Huellitas de Amor API

API RESTful desarrollada con Node.js y Express para la gestión de adopción de mascotas.
Permite administrar usuarios, mascotas y solicitudes de adopción con autenticación segura mediante JWT.

---

## 🚀 Tecnologías utilizadas

* Node.js
* Express.js
* Sequelize (ORM)
* PostgreSQL
* JSON Web Tokens (JWT)
* Multer (subida de archivos)
* Bcrypt (encriptación)
* HTML + CSS + JS (frontend básico)

---

## 📁 Estructura del proyecto

```
src/
├── controllers/     # Controladores (manejan request/response)
├── services/        # Lógica de negocio
├── repositories/    # Acceso a base de datos
├── models/          # Modelos Sequelize
├── routes/          # Definición de rutas
├── middlewares/     # JWT, roles, errores, multer
├── config/          # Configuración DB
├── uploads/         # Imágenes subidas
├── logs/            # Logs del sistema
└── app.js           # Configuración principal
```

---

## ⚙️ Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/carolinamendezsoto-design/Modulo-8.git
cd Modulo-8
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear archivo `.env`:

```env
PORT=3000
DB_NAME=tu_db
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_HOST=localhost
JWT_SECRET=tu_secreto_super_seguro
```

4. Ejecutar el servidor:

```bash
npm run dev
```

---

## 🔐 Autenticación (JWT)

### Login

```http
POST /api/auth/login
```

**Body:**

```json
{
  "email": "correo@ejemplo.com",
  "password": "123456"
}
```

**Respuesta:**

```json
{
  "status": "success",
  "message": "Login exitoso",
  "data": {
    "token": "JWT_TOKEN",
    "user": {
      "id": 1,
      "email": "correo@ejemplo.com",
      "rol": "admin"
    }
  }
}
```

👉 Usa el token en headers:

```
Authorization: Bearer TU_TOKEN
```

---

## 👤 Roles del sistema

* **admin** → acceso total
* **rescatista** → gestiona mascotas
* **adoptante** → solicita adopciones

---

## 🐶 Endpoints principales

### 👤 Usuarios

| Método | Endpoint       | Descripción            |
| ------ | -------------- | ---------------------- |
| GET    | /api/users     | Obtener usuarios       |
| GET    | /api/users/:id | Obtener usuario por ID |
| POST   | /api/users     | Crear usuario          |
| PUT    | /api/users/:id | Actualizar usuario     |
| DELETE | /api/users/:id | Eliminar usuario       |

---

### 🐾 Mascotas

| Método | Endpoint          | Descripción     |
| ------ | ----------------- | --------------- |
| GET    | /api/mascotas     | Listar mascotas |
| GET    | /api/mascotas/:id | Obtener mascota |
| POST   | /api/mascotas     | Crear mascota   |
| PUT    | /api/mascotas/:id | Actualizar      |
| DELETE | /api/mascotas/:id | Eliminar        |

📌 Permite subir imagen con multer

---

### ❤️ Solicitudes de adopción

| Método | Endpoint                      | Descripción     |
| ------ | ----------------------------- | --------------- |
| POST   | /api/solicitudes              | Crear solicitud |
| GET    | /api/solicitudes/mis          | Mis solicitudes |
| GET    | /api/solicitudes/mascota/:id  | Ver postulantes |
| PUT    | /api/solicitudes/:id/aprobar  | Aprobar         |
| PUT    | /api/solicitudes/:id/rechazar | Rechazar        |

---

## 📸 Subida de archivos

```http
POST /api/upload
```

* Tipos permitidos: JPG, PNG, WEBP
* Tamaño máximo: 5MB

---

## 🛡️ Seguridad

* Autenticación con JWT
* Protección de rutas privadas
* Middleware de roles
* Validación de archivos
* Encriptación de contraseñas

---

## 📊 Formato de respuestas

Todas las respuestas siguen estructura estándar:

```json
{
  "status": "success | error",
  "message": "Descripción",
  "data": {}
}
```

---

## 🧠 Arquitectura

El proyecto sigue una arquitectura modular:

* **Controllers** → manejan HTTP
* **Services** → lógica de negocio
* **Repositories** → acceso a DB
* **Middlewares** → seguridad y validaciones

---

## 🧪 Testing

Se recomienda usar:

* Postman
* Thunder Client

---

## 💡 Funcionalidades destacadas

* Sistema de roles
* Flujo completo de adopción
* Match de mascotas según preferencias
* Subida de imágenes
* Arquitectura escalable

---

## 👩‍💻 Autor

**Carolina Méndez Soto**

Proyecto desarrollado como trabajo final del módulo backend (Node.js + Express).

---

## ⭐ Estado del proyecto

✅ Funcional
✅ API REST completa
✅ Lista para frontend o consumo externo

---

## 🚀 Mejoras futuras

* Documentación con Swagger
* Refresh tokens
* Tests automatizados
* Deploy en producción

---
