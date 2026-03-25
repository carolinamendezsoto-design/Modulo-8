<div align="center">
  
  <h1>🐾 Huellitas de Amor API</h1>
  <p><b>API RESTful profesional construida con Node.js y Express para gestionar la adopción responsable de mascotas.</b></p>
  
  <p>
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express">
    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
    <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white" alt="Sequelize">
    <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JWT">
  </p>
</div>

---

## 📖 Acerca del Proyecto

**Huellitas de Amor** es el ecosistema Backend definitivo para una plataforma de adopciones. Proporciona una interfaz programática segura para administrar usuarios, mascotas y emparejar familias con animales rescatados mediante un sistema avanzado de postulaciones.

> [!NOTE]
> Este software fue diseñado exclusivamente para operar dentro de la **Comuna de Puente Alto, Chile (🇨🇱)**, promoviendo el bienestar animal a través de tecnología moderna.

### ✨ Características Principales
- 🔐 **Autenticación Total:** Sistema JWT seguro con expiración de sesión.
- 👥 **Control Basado en Roles (RBAC):** Privilegios de Administrador, Rescatista y Adoptante.
- 🖼️ **Gestión Multi-Media:** Subida controlada de avatares mediante _Multer_.
- 💾 **Integridad Relacional:** Arquitectura ORM estricta modelando múltiples entidades 1:N y N:M.

---

## 🛠️ Instalación y Configuración (Guía Rápida)

<details>
<summary><b>Haz clic aquí para ver las instrucciones paso a paso</b></summary>
<br>

**1. Clonar el Repositorio**
```bash
git clone https://github.com/carolinamendezsoto-design/Modulo-8.git
cd Modulo-8
```

**2. Descargar Dependencias**
```bash
npm install
```

**3. Variables de Entorno (`.env`)**
Configura tu acceso al motor PostgreSQL en la raíz del proyecto:
```env
PORT=3000
DB_NAME=tu_base_de_datos
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
JWT_SECRET=secreto_jwt_super_seguro
```

**4. Levantar Servidor**
```bash
npm run dev
```
</details>

---

## 🔐 Seguridad y Autenticación

Toda interacción privada requiere un **Token Bearer** emitido por nuestro orquestador `auth.service`.

> [!IMPORTANT]
> **Adquisición del Token (Login)**  
> Enviar **POST** a `/api/auth/login` con `{ "email": "...", "password": "..." }`.

**Uso en Clientes REST (Postman / Frontend):**
```http
Authorization: Bearer <TU_TOKEN_JWT>
```

---

## 🌐 Endpoints Oficiales

_Haz clic en cada categoría para desplegar la tabla de rutas:_

<details>
<summary><b>🐈 Rutas de Mascotas</b></summary>
<br>

| Método | Endpoint | Privilegio Requerido | Acción |
| :---: | :--- | :---: | :--- |
| `GET` | `/api/mascotas` | 🟢 Público | Listar catálogo disponible |
| `GET` | `/api/mascotas/:id` | 🟢 Público | Ver detalles específicos |
| `POST` | `/api/mascotas` | 🛡️ Rescatista / Admin | Publicar nueva mascota |
| `PUT` | `/api/mascotas/:id` | 🛡️ Rescatista / Admin | Actualizar ficha clínica |
| `DELETE`| `/api/mascotas/:id` | 🛡️ Rescatista / Admin | Dar de baja |

</details>

<details>
<summary><b>👤 Rutas de Usuarios</b></summary>
<br>

| Método | Endpoint | Privilegio Requerido | Acción |
| :---: | :--- | :---: | :--- |
| `GET` | `/api/users` | 🛡️ Admin | Reporte global de usuarios |
| `GET` | `/api/users/:id` | 🛡️ Admin | Extraer perfil específico |
| `POST` | `/api/users` | 🟢 Público | Registrar nueva cuenta |
| `PUT` | `/api/users/:id` | 🛡️ Admin | Sobrescribir datos |
| `DELETE`| `/api/users/:id` | 🛡️ Admin | Suspender cuenta |

</details>

<details>
<summary><b>❤️ Rutas de Postulación (Adopción)</b></summary>
<br>

| Método | Endpoint | Privilegio Requerido | Acción |
| :---: | :--- | :---: | :--- |
| `POST` | `/api/solicitudes` | 🛡️ Adoptante | Iniciar trámite de adopción |
| `GET` | `/api/solicitudes/mis` | 🛡️ Adoptante | Mis registros de postulación |
| `GET` | `/api/solicitudes/mascota/:id` | 🛡️ Rescatista | Verificar aplicantes locales |
| `PUT` | `/api/solicitudes/:id/aprobar` | 🛡️ Admin | Finalizar trámite con éxito |
| `PUT` | `/api/solicitudes/:id/rechazar` | 🛡️ Admin | Denegar postulación |

</details>

<details>
<summary><b>🔔 Rutas de Notificaciones</b></summary>
<br>

| Método | Endpoint | Privilegio Requerido | Acción |
| :---: | :--- | :---: | :--- |
| `GET` | `/api/notificaciones` | 🛡️ Protegido (JWT) | Listar bandeja de entrada |
| `PUT` | `/api/notificaciones/leer` | 🛡️ Protegido (JWT) | Marcar alertas como leídas |

</details>

<details>
<summary><b>📸 Carga Binaria (Uploads)</b></summary>
<br>

**Ruta:** `POST /api/upload`  
**Restricciones:** Límite máximo = `5 MB` | Mimetypes admitidos = `.jpg, .png, .webp`
</details>

---

## 🎓 Justificación Académica (Proyecto Integrador)

En acatamiento absoluto a los requerimientos de la métrica (Módulos 6, 7 y 8):

> [!TIP]
> **1. Separación de Rutas y Controladores (Arquitectura)**  
> Se optó por un patrón **MVC Expandido** (`routes`, `controllers`, `services`, `repositories`, `models`).  
> **Justificación:** Garantiza el *Principio de Responsabilidad Única*. Las Rutas solo canalizan HTTP; los Controladores extraen y validan los *Params/Body*; los Servicios manejan el álgebra de negocio, y los Repositorios se encargan exclusivamente del diálogo SQL (ORM).

> [!TIP]
> **2. Validaciones Previas (Datos e Imágenes)**  
> **Datos:** Correos duplicados o credenciales vacías son interceptados por el Servicio ANTES de llegar a PostgreSQL, evitando bloqueos por *Constraints*.  
> **Imágenes:** Restringidas severamente mediante un *FileFilter* de `Multer` para imposibilitar inyecciones *Shell* o saturación de almacenamiento.

> [!TIP]
> **3. Criptografía y Seguridad Perimetral**  
> **¿Por qué proteger las rutas?** Evita el secuestro y manipulación de datos destructivos. Solo "Rescatistas" modifican mascotas, y solo "Administradores" modifican cuentas globales.  
> **Manejo del Token:** Tras su emisión con `bcrypt`, el frontend encapsula y almacena el JWT persistente en `localStorage`, adjuntándolo transparente y obligatoriamente en la cabecera `Authorization` en futuros requests a las barreras middleware de Express.

> [!TIP]
> **4. Persistencia Plana Integral**  
> El sistema no solo persiste al motor PostgreSQL; también escribe logs estáticos sobre disco mediante `fs.appendFile` en el `logger.middleware.js`, cumpliendo los requerimientos técnicos de "Registro en Archivos Simples".

---

<br>

<div align="center">
  <b>👩‍💻 Desarrollado por: Carolina Méndez Soto</b> <br>
  <i>Proyecto Final de Módulo.</i> <br>
  💚🐾
</div>
