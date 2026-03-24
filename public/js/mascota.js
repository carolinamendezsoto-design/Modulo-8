// ------------------------------------------------------
// 🌐 CONFIGURACIÓN BASE DEL BACKEND
// ------------------------------------------------------

// Definimos la URL base de nuestra API para no repetirla
const API_URL = "http://localhost:3000/api";


// ------------------------------------------------------
// 🔐 OBTENER TOKEN
// ------------------------------------------------------

// Recuperamos el token de acceso guardado en el almacenamiento local del navegador
const token = localStorage.getItem("token");


// ------------------------------------------------------
// 🚨 VALIDACIÓN DE SESIÓN
// ------------------------------------------------------

// Verificamos si el usuario no tiene un token (no ha iniciado sesión)
if (!token) {

    // Mostramos una alerta en pantalla usando nuestra utilidad
    mostrarMensaje("Debes iniciar sesión para ver esta página", "danger");

    // Esperamos un momento y redirigimos al usuario a la página de inicio
    setTimeout(() => {
        window.location.href = "index.html";
    }, 800);
}


// ------------------------------------------------------
// 📦 ELEMENTOS DEL DOM
// ------------------------------------------------------

// Buscamos el contenedor donde vamos a renderizar las tarjetas de las mascotas
const contenedor = document.getElementById("contenedorMascotas");

// Buscamos el pequeño círculo (badge) numérico de notificaciones
const contador = document.getElementById("contadorNoti");

// Buscamos el icono de la campana para poder animarlo
const campana = document.getElementById("campana");

// Inicializamos la variable donde guardaremos el id de la mascota al abrir el formulario
let mascotaSeleccionada = null;


// ------------------------------------------------------
// 🔔 CARGAR NOTIFICACIONES
// ------------------------------------------------------

// Creamos la función asíncrona para consultar notificaciones
async function cargarNotificaciones() {

    try {

        // Hacemos una petición al backend pidiendo nuestras notificaciones
        const res = await fetch(`${API_URL}/notificaciones`, {

            // Pasamos los encabezados (headers) incluyendo nuestra autorización
            headers: {
                Authorization: "Bearer " + token
            }
        });

        // Convertimos la respuesta del servidor a formato JSON
        const data = await res.json();

        // Filtramos de la lista solo las notificaciones que no han sido leídas
        const noLeidas = (data.data || []).filter(n => !n.leido);

        // Si tenemos notificaciones pendientes sin leer
        if (noLeidas.length > 0) {

            // Hacemos visible el contador numérico
            contador.style.display = "inline-block";
            // Mostramos la cantidad de notificaciones sin leer
            contador.textContent = noLeidas.length;

            // Agregamos la clase que hace vibrar la campana
            campana.classList.add("campana-activa");

        } else {

            // Ocultamos el contador numérico si no hay notificaciones
            contador.style.display = "none";
            // Quitamos la animación de la campana
            campana.classList.remove("campana-activa");
        }

    } catch (error) {

        // Imprimimos el error por consola en caso de fallo crítico
        console.error("Error al cargar las notificaciones:", error);
    }
}


// ------------------------------------------------------
// 🔁 IR A NOTIFICACIONES
// ------------------------------------------------------

// Redirige la ventana a la página de notificaciones
function irNotificaciones() {

    // Cambiamos la URL a la que estemos apuntando
    window.location.href = "notificaciones.html";
}


// ------------------------------------------------------
// 🐶 CARGAR MASCOTAS
// ------------------------------------------------------

// Función asíncrona para traer todas las mascotas
async function cargarMascotas() {

    try {

        // Consumimos el endpoint público que devuelve las mascotas disponibles
        const res = await fetch(`${API_URL}/mascotas`);

        // Extraemos los datos transformándolos a objeto de JavaScript
        const data = await res.json();

        // Si la respuesta indica un fallo, lanzamos un error que atrapará el catch
        if (!res.ok) throw new Error(data.message);

        // Limpiamos el contenedor HTML dejándolo vacío antes de dibujar
        contenedor.innerHTML = "";

        // Verificamos de forma segura si trajo mascotas, sino dejamos arreglo vacío
        const mascotas = data.data || [];

        // Evaluamos si el arreglo está vacío
        if (!mascotas.length) {

            // Mostramos un mensaje de que no hay mascotas para adoptar
            contenedor.innerHTML = "<p>No hay mascotas disponibles por el momento 🐾</p>";
            // Rompemos el flujo de la función
            return;
        }

        // Iteramos cada mascota que nos devolvió el servidor
        mascotas.forEach(m => {

            // Preparamos la URL de la imagen. Si hay imagen, vamos a public/uploads/. Si no, usamos default.
            const imagenUrl = m.imagen ? `http://localhost:3000/uploads/${m.imagen}` : "img/default.jpg";

            // Creamos un nuevo divisor de código
            const div = document.createElement("div");

            // Le asignamos las clases de Bootstrap para que ocupe espacio y margen
            div.className = "col-md-4 mb-4";

            // Agregamos el diseño UI Premium estilo Glass y la imagen completa
            div.innerHTML = `
                <div class="card p-3 text-white h-100 d-flex flex-column">

                    <!-- Imagen de la mascota -->
                    <img src="${imagenUrl}" alt="${m.nombre}" class="img-fluid rounded mb-3" style="height: 200px; object-fit: cover; border-radius: 15px;">

                    <!-- Nombre de la mascota -->
                    <h4 class="fw-bold">${m.nombre}</h4>

                    <!-- Detalles rápidos tipo etiquetas / badges -->
                    <div class="mb-3">
                        <span class="badge bg-primary me-1">${m.raza || "Mestizo"}</span>
                        <span class="badge bg-info text-dark me-1">${m.edad}</span>
                        <span class="badge bg-secondary me-1">Tamaño ${m.porte}</span>
                        <span class="badge bg-warning text-dark">Energía ${m.energia}</span>
                    </div>

                    <!-- Descripción -->
                    <p class="flex-grow-1">${m.descripcion || "Sin descripción disponible."}</p>

                    <!-- Botón para postular o adoptar -->
                    <button class="btn btn-success w-100 fw-bold mt-auto" onclick="abrirFormulario(${m.id})">
                        Adoptar
                    </button>

                </div>
            `;

            // Finalmente insertamos la tarjeta recién creada en el DOM
            contenedor.appendChild(div);
        });

    } catch (error) {

        // En caso de que se rompa, lo logueamos
        console.error("Error al cargar las mascotas:", error);

        // Avisamos al usuario con un banner de error
        mostrarMensaje(error.message || "Hubo un error cargando las adopciones", "danger");
    }
}


// ------------------------------------------------------
// 📋 ABRIR MODAL
// ------------------------------------------------------

// Función que se llama al pulsar sobre "Adoptar" pasándole el ID
function abrirFormulario(id) {

    // Guardamos la mascota seleccionada en nuestra variable global
    mascotaSeleccionada = id;

    // Levantamos el modal usando la API que nos ofrece Bootstrap
    new bootstrap.Modal(
        document.getElementById("modalAdopcion")
    ).show();
}


// ------------------------------------------------------
// 📩 ENVIAR SOLICITUD DE ADOPCIÓN
// ------------------------------------------------------

// Función que manda la aplicación desde el modal
async function enviarSolicitud() {

    try {

        // Capturamos el valor de la edad desde el DOM de manera segura
        const inputEdad = document.getElementById("edad").value.trim();
        // Capturamos la experiencia previa de adopción
        const inputExperiencia = document.getElementById("experiencia").value.trim();
        // Capturamos los datos sobre el espacio en casa de manera segura
        const inputEspacio = document.getElementById("espacio").value.trim();

        // Construimos un único hilo de mensaje con lo que el usuario rellenó
        const mensaje = `
Edad del adoptante: ${inputEdad}
Experiencia previa: ${inputExperiencia}
Espacio en casa: ${inputEspacio}
        `;

        // Mandamos el mensaje hacia nuestra API para que guarde la solicitud
        const res = await fetch(`${API_URL}/solicitudes`, {

            // Este es un envío de datos nuevo, usamos método POST
            method: "POST",

            // Declaramos las cabeceras pertinentes y pasamos sesión JWT
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            },

            // Pasamos nuestra solicitud con el respectivo código del animalito y mensaje
            body: JSON.stringify({
                mascotaId: mascotaSeleccionada,
                mensaje
            })
        });

        // Transmorfamos la respuesta binaria a nuestro objeto json
        const data = await res.json();

        // En caso del más mínimo fallo desde el servidor cortamos todo el proceso
        if (!res.ok) throw new Error(data.message);

        // Indicamos con éxito visual que todo salió perfecto
        mostrarMensaje("¡Postulación enviada exitosamente! 🐾", "success");

        // Al cabo de casi un segundo recargamos para borrar la caché visual y refrescar
        setTimeout(() => location.reload(), 800);

    } catch (error) {

        // Vemos a los peones caídos en el frente de batalla (debug)
        console.error("Error al enviar la solicitud:", error);

        // Exponemos el error a nuestro estimado usuario
        mostrarMensaje(error.message, "danger");
    }
}


// ------------------------------------------------------
// 👤 MOSTRAR USUARIO ACTIVO
// ------------------------------------------------------

// Definimos una función para mostrar quién está conectado
function mostrarUsuarioActivo() {
    try {
        // Intentamos leer y convertir los datos del usuario guardado en memoria
        const user = JSON.parse(localStorage.getItem("user"));
        
        // Si logramos obtener un usuario válido y tiene su nombre
        if (user && user.nombre) {
            
            // Buscamos la etiqueta destinada a mostrar su perfil en el HTML
            const etiquetaUsuario = document.getElementById("nombreUsuario");
            
            // Si la etiqueta existe en la pantalla
            if (etiquetaUsuario) {
                // Escribimos el nombre acompañado de un pequeño emoji
                etiquetaUsuario.textContent = "👤 " + user.nombre;
            }
        }
    } catch (error) {
        // Si falla la lectura, lo dejamos en silencio (no afecta a los perfiles anónimos si existieran)
        console.error("No se pudo cargar el nombre del usuario:", error);
    }
}


// ------------------------------------------------------
// 🚀 INICIO DEL SCRIPT
// ------------------------------------------------------

// Agregamos un oyente al documento que avisa cuando todo cargó
document.addEventListener("DOMContentLoaded", () => {

    // Dibujamos el nombre del usuario en la parte superior
    mostrarUsuarioActivo();

    // Ejecutamos la carga de nuestro grid de peluditos
    cargarMascotas();

    // Ejecutamos el sistema de notificaciones
    cargarNotificaciones();

});


// ------------------------------------------------------
// 🌍 FUNCIONES GLOBALES (ACCESIBILIDAD AL HTML)
// ------------------------------------------------------

// Enganchamos las funciones a nuestra ventana global para que los onclick de HTML funcionen
window.irNotificaciones = irNotificaciones;
window.abrirFormulario = abrirFormulario;
window.enviarSolicitud = enviarSolicitud;