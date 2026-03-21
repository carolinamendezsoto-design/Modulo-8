# 🐾 Huellitas de Amor - API Backend

Aplicación backend desarrollada con **Node.js + Express** para la gestión de adopción de mascotas.
Permite registrar usuarios, publicar mascotas, postular a adopciones y gestionar solicitudes mediante una API RESTful segura.

---

## 🚀 Tecnologías utilizadas

* Node.js
* Express.js
* Sequelize (ORM)
* PostgreSQL
* JSON Web Tokens (JWT)
* Multer (subida de archivos)
* Nodemon

---

## 📁 Estructura del proyecto

```
src/
│
├── controllers/     # Lógica de entrada (req/res)
├── services/        # Lógica de negocio
├── models/          # Modelos Sequelize
├── routes/          # Definición de endpoints
├── middlewares/     # JWT, multer, errores
├── config/          # Configuración DB
│
├── uploads/         # Imágenes subidas
├── app.js           # Configuración Express
└── server.js        # Inicialización del servidor
```

---

## ⚙️ Instalación y ejecución

### 1. Clonar repositorio

```
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```

### 2. Instalar dependencias

```
npm install
```

### 3. Configurar variables de entorno

Crear archivo `.env`:

```
PORT=3000
DB_NAME=nombre_db
DB_USER=usuario
DB_PASS=password
DB_HOST=localhost
JWT_SECRET=secreto_super_seguro
```

### 4. Ejecutar servidor

```
npm run dev
```

Servidor corriendo en:

```
http://localhost:3000
```

---

## 🔐 Autenticación

La API utiliza **JWT (JSON Web Token)**.

### Login

```
POST /api/auth/login
```

Respuesta:

```
{
  "token": "..."
}
```

### Uso del token

Enviar en headers:

```
Authorization: Bearer TU_TOKEN
```

---

## 📌 Endpoints principales

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

| Método | Endpoint            | Descripción                |
| ------ | ------------------- | -------------------------- |
| GET    | /api/mascotas       | Listar mascotas            |
| GET    | /api/mascotas/:id   | Ver mascota                |
| POST   | /api/mascotas       | Crear mascota (con imagen) |
| PUT    | /api/mascotas/:id   | Actualizar mascota         |
| DELETE | /api/mascotas/:id   | Eliminar mascota           |
| GET    | /api/mascotas/match | Match por preferencias     |

---

### 📨 Solicitudes de adopción

| Método | Endpoint                         | Descripción       |
| ------ | -------------------------------- | ----------------- |
| POST   | /api/solicitudes                 | Crear solicitud   |
| GET    | /api/solicitudes/mascota/:id     | Ver postulantes   |
| PUT    | /api/solicitudes/:id/seleccionar | Aprobar adoptante |

---

### 📂 Subida de archivos

| Método | Endpoint    | Descripción  |
| ------ | ----------- | ------------ |
| POST   | /api/upload | Subir imagen |

✔ Tipos permitidos: JPG, JPEG, PNG
✔ Tamaño máximo: 5MB

---

## 🧠 Modelo de datos (relaciones)

* Un **usuario** puede tener muchas mascotas
* Una **mascota** pertenece a un usuario
* Una **mascota** puede tener muchas solicitudes
* Una **solicitud** pertenece a una mascota y a un usuario

---

## 🔄 Flujo de adopción

1. Usuario (adoptante) postula a una mascota
2. Rescatista revisa postulantes
3. Selecciona adoptante
4. Sistema:

   * aprueba solicitud elegida
   * rechaza las demás
   * cambia estado de mascota a "adoptado"

---

## 🔒 Seguridad

* Autenticación mediante JWT
* Rutas protegidas por middleware
* Validación de archivos en subida
* Control de roles (admin, rescatista, adoptante)

---

## 📸 Manejo de imágenes

Las imágenes se almacenan en:

```
/uploads
```

Acceso:

```
http://localhost:3000/uploads/nombre_imagen.jpg
```

---

## 🧪 Pruebas

Se recomienda usar:

* Postman
* Thunder Client

Para testear:

* login
* rutas protegidas
* subida de imágenes
* flujo de adopción

---

## 📌 Estado del proyecto

✔ API REST funcional
✔ Autenticación JWT
✔ CRUD completo
✔ ORM con relaciones
✔ Subida de archivos
✔ Flujo de adopción implementado

---

## 💼 Autor

Desarrollado por: **[Tu Nombre]**

Proyecto final - Backend Node.js & Express
Alkemy Bootcamp 🚀

---

## ⭐ Notas finales

Este proyecto representa una implementación completa de backend moderno, incluyendo:

* Arquitectura modular
* Seguridad
* Persistencia en base de datos
* Manejo de archivos
* Lógica de negocio real

---
