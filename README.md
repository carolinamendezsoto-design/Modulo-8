# 🐾 Huellitas de Amor — Plataforma de Adopción de Mascotas

Aplicación web full stack para la gestión de adopción de mascotas, que permite conectar rescatistas con adoptantes mediante un sistema de postulaciones, evaluación y selección.

---

## 🚀 Tecnologías utilizadas

### Backend

* Node.js
* Express.js
* Sequelize ORM
* MySQL
* JWT (autenticación)
* Multer (subida de imágenes)

### Frontend

* HTML5
* CSS3 (Glassmorphism UI)
* JavaScript (Vanilla)

---

## 🧠 Arquitectura del proyecto

El backend está estructurado siguiendo una arquitectura en capas:

```
Routes → Controller → Service → Repository → Model
```

### 🔹 Descripción de capas

* **Routes:** Definición de endpoints y middlewares
* **Controller:** Manejo de request/response (sin lógica de negocio)
* **Service:** Lógica de negocio y validaciones
* **Repository:** Acceso a base de datos (Sequelize)
* **Model:** Definición de entidades y relaciones

---

## 👥 Roles del sistema

* **Admin**

  * Gestiona usuarios
  * Acceso total al sistema

* **Rescatista**

  * Publica mascotas
  * Revisa postulantes
  * Selecciona adoptante

* **Adoptante**

  * Explora mascotas
  * Postula a adopción
  * Ve sus solicitudes

---

## 🐶 Funcionalidades principales

### 🔹 Mascotas

* Crear mascota (con imagen)
* Listar mascotas con filtros
* Editar mascota
* Eliminar mascota
* Cambiar estado (disponible → adoptado)

---

### 🔹 Solicitudes de adopción

* Postular a una mascota
* Ver postulantes por mascota
* Ver mis solicitudes
* Aprobar adoptante
* Rechazar solicitud

---

### 🔹 Sistema de Match

* Recomendación de mascotas según:

  * Energía
  * Porte

---

### 🔹 Usuarios

* Registro con rol
* Login con JWT
* Gestión de usuarios (admin)

---

## 🔐 Autenticación

Se utiliza JWT para proteger rutas privadas.

* Login genera token
* Middleware valida acceso
* Roles controlan permisos

---

## 🗄️ Base de datos

### Relaciones principales

* Usuario (1:N) Mascotas
* Usuario (1:N) Solicitudes
* Mascota (1:N) Solicitudes

### Restricciones importantes

* No se permiten solicitudes duplicadas:

```
(mascotaId + adoptanteId) UNIQUE
```

---

## 📦 Instalación y ejecución

### 1. Clonar repositorio

```bash
git clone <tu-repo>
cd proyecto
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear archivo `.env`:

```
DB_NAME=...
DB_USER=...
DB_PASSWORD=...
JWT_SECRET=...
```

### 4. Ejecutar servidor

```bash
npm run dev
```

---

## 🧪 Usuario administrador

Se puede crear usando el script:

```bash
node seedAdmin.js
```

---

## 📌 Endpoints principales

### Mascotas

* `GET /api/mascotas`
* `POST /api/mascotas`
* `PUT /api/mascotas/:id`
* `DELETE /api/mascotas/:id`
* `GET /api/mascotas/match/filtro`

---

### Solicitudes

* `POST /api/solicitudes`
* `GET /api/solicitudes/mascota/:id`
* `GET /api/solicitudes/mis-solicitudes`
* `PUT /api/solicitudes/:id/seleccionar`
* `PUT /api/solicitudes/:id/rechazar`

---

## 🎨 UI/UX

* Diseño moderno tipo glassmorphism
* Interfaces separadas por rol
* Navegación clara y consistente

---

## 📈 Mejoras futuras

* Loader de carga
* Notificaciones visuales
* Paginación de resultados
* Tests automatizados

---

## 🏆 Conclusión

Este proyecto implementa un sistema completo de adopción con arquitectura escalable, separación de responsabilidades y funcionalidades reales de negocio, acercándose a estándares de desarrollo profesional.

---

✨ Desarrollado por Carolina Méndez Soto
