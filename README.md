# 🐾 Huellitas de Amor – API Backend

Aplicación backend desarrollada con **Node.js + Express + Sequelize**, que permite gestionar usuarios, mascotas y procesos de adopción mediante una **API RESTful segura con JWT**.

Este proyecto forma parte del **Módulo 6, 7 y 8**, integrando arquitectura backend moderna, persistencia en base de datos y seguridad.

---

## 🚀 Tecnologías utilizadas

* Node.js
* Express.js
* Sequelize (ORM)
* PostgreSQL
* JSON Web Tokens (JWT)
* Multer (subida de archivos)
* Bcrypt (hash de contraseñas)

---

## 📁 Arquitectura del proyecto

El proyecto sigue una arquitectura modular:

```
/controllers   → Manejan requests y responses
/services      → Lógica de negocio
/repositories  → Acceso a base de datos
/routes        → Definición de endpoints
/middlewares   → Auth, roles, errores, upload
/models        → Definición de entidades (Sequelize)
```

---

## 🔐 Autenticación

La API utiliza **JWT (JSON Web Tokens)** para proteger rutas.

### 🔑 Login

**POST /api/auth/login**

```json
{
  "email": "usuario@email.com",
  "password": "123456"
}
```

### 📌 Respuesta:

```json
{
  "status": "success",
  "message": "Login exitoso",
  "data": {
    "token": "JWT_TOKEN"
  }
}
```

👉 El token debe enviarse en cada request protegida:

```
Authorization: Bearer TOKEN
```

---

## 👤 Roles del sistema

* **admin** → gestión total
* **rescatista** → publica mascotas y gestiona adopciones
* **adoptante** → postula a mascotas

---

## 🐶 Endpoints principales

### 👤 Usuarios

* GET `/api/users`
* DELETE `/api/users/:id`
* PUT `/api/users/:id/role`

---

### 🐾 Mascotas

* GET `/api/mascotas`
* POST `/api/mascotas`
* PUT `/api/mascotas/:id`
* DELETE `/api/mascotas/:id`

---

### 📩 Solicitudes de adopción

* POST `/api/solicitudes` → Crear solicitud
* GET `/api/solicitudes/mascota/:mascotaId`
* GET `/api/solicitudes/mis` → Mis solicitudes
* PUT `/api/solicitudes/:id/aprobar`
* PUT `/api/solicitudes/:id/rechazar`

---

## 🔄 Flujo de adopción

1. El adoptante crea una solicitud
2. El rescatista revisa postulantes
3. Se aprueba una solicitud
4. La mascota cambia a estado **adoptado**

---

## 📤 Subida de archivos

**POST /api/upload**

* Permite subir imágenes
* Validación de tipo y tamaño
* Archivos almacenados en `/uploads`

---

## ⚙️ Instalación

1. Clonar repositorio:

```
git clone https://github.com/carolinamendezsoto-design/Modulo-8
```

2. Instalar dependencias:

```
npm install
```

3. Configurar variables de entorno:

Crear archivo `.env`:

```
PORT=3000
DB_NAME=nombre_db
DB_USER=usuario
DB_PASSWORD=password
JWT_SECRET=secreto
```

4. Ejecutar servidor:

```
npm run dev
```

---

## 🧪 Testing

Puedes probar la API con:

* Postman
* Thunder Client

Asegúrate de:

* Hacer login
* Usar token en rutas protegidas

---

## ⚠️ Manejo de errores

La API responde de forma consistente:

```json
{
  "status": "error",
  "message": "Descripción del error"
}
```

---

## 📌 Decisiones técnicas

* Uso de **Sequelize** para manejo de relaciones complejas
* Separación en capas (controller → service → repository)
* JWT para seguridad sin sesiones
* Multer para manejo de archivos

---

## 📈 Estado del proyecto

✔ API REST funcional
✔ Autenticación con JWT
✔ Subida de archivos
✔ Arquitectura modular
✔ Flujo completo de adopción

---

## 💼 Portafolio

Este proyecto demuestra habilidades en:

* Diseño de APIs RESTful
* Backend con Node.js
* Seguridad con JWT
* Manejo de base de datos relacional
* Arquitectura escalable

---

## 👩‍💻 Autora

Carolina Méndez Soto
