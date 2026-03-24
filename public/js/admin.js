// ------------------------------------------------------
// 🔐 OBTENER TOKEN Y DATOS DE SESIÓN
// ------------------------------------------------------

// Rescatamos nuestro pase de entrada o token guardado localmente
const token = localStorage.getItem("token");

// Declaramos la variable para almacenar quién está detrás de la pantalla
let user = null;

try {
    // Tratamos de leer de manera confiable la cadena del perfil guardada
    user = JSON.parse(localStorage.getItem("user"));
} catch (error) {
    // Si llegaramos a fallar leyendo el dato, lo devolvemos a nulo y seguimos adelante
    user = null;
}

// ------------------------------------------------------
// 🚨 PROTECCIÓN DE ACCESO PARA ADMINS
// ------------------------------------------------------

// Con mucho cuidado, limpiamos y convertimos a minúscula el rango que tenga el usuario
const rol = user?.rol?.toLowerCase()?.trim();

// Evaluamos si el invitado viene sin token, sin datos o con el rango pirata (diferente de admin)
if (!token || !user || rol !== "admin") {

    // Mandamos una notificación visual a modo de advertencia amigable
    mostrarMensaje("Esta zona está reservada exclusivamente para administradores", "danger");

    // Damos casi un segundo de espera para asimilar el golpe antes del redireccionamiento
    setTimeout(() => {
        window.location.href = "index.html"; // Redirigimos al inicio de inmediato
    }, 800);
}


// ------------------------------------------------------
// 🔔 GESTIÓN DE NOTIFICACIONES (LA CAMPANITA)
// ------------------------------------------------------

// Creamos un subproceso asíncrono para buscar avisos
async function cargarNotificaciones() {
    try {
        // Pedimos amablemente las notificaciones apuntando a la api del backend
        const res = await fetch("http://localhost:3000/api/notificaciones", {
            // Llevamos nuestras firmas de autenticación en la billetera
            headers: { Authorization: "Bearer " + token }
        });
        
        // Transformamos el paquete binario de respuesta a JSON manipulable en Javascript
        const data = await res.json();
        
        // Cosemos el filtro para apartar y contar solo aquellas notas que no se hayan leído
        const noLeidas = (data.data || []).filter(n => !n.leido);
        
        // Capturamos el globo numérico y el ícono visual en el HTML
        const contador = document.getElementById("contadorNoti");
        const campana = document.getElementById("campana");

        // Si realmente tenemos mensajes frescos sin ver
        if (noLeidas.length > 0) {
            contador.style.display = "inline-block";     // Mostramos la bolita roja
            contador.textContent = noLeidas.length;      // Rellenamos la cantidad
            campana.classList.add("campana-activa");     // Forzamos a que inicie a vibrar infinitamente
        } else {
            // Si todo está al día o leído
            contador.style.display = "none";              // Escondemos la bola
            campana.classList.remove("campana-activa");   // Detenemos tranquilamente su animación vibrante
        }
    } catch (error) {
        // Si hay una desconexión o falla el internet, avisamos a nosotros mismos en consola
        console.error("Error al poblar las notificaciones:", error);
    }
}

// Función sencilla enlazada al click de la campanita web
function irNotificaciones() {
    // Cambiamos de página de golpe hacia los informes
    window.location.href = "notificaciones.html";
}


// ------------------------------------------------------
// 🚀 INICIALIZACIÓN PRINCIPAL Y DIBUJO UI
// ------------------------------------------------------

// Agregamos un oyente vigilante para cuando el documento termine de cargar enteramente
document.addEventListener("DOMContentLoaded", () => {

    // 👤 DIBUJAMOS AL USUARIO EN EL ENCABEZADO
    const nombreAdmin = document.getElementById("nombreAdmin");

    // Nos aseguramos que haya a quién nombrar
    if (user && user.nombre && nombreAdmin) {
        // Concatenamos un emoji sutil a modo decorativo
        nombreAdmin.textContent = "👤 " + user.nombre;
    }

    // Arrancamos el circuito eléctrico de la campana
    cargarNotificaciones();

    // Arrancamos el motor de estadísticas en tiempo real
    cargarDashboard();
});

// ------------------------------------------------------
// 📊 CARGAR ESTADÍSTICAS DEL DASHBOARD
// ------------------------------------------------------
async function cargarDashboard() {
    try {
        // Mostrar los contenedores de datos
        document.getElementById("adminStats").style.display = "flex";
        document.getElementById("ultimosUsuariosCard").style.display = "block";

        // Traer datos en paralelo desde nuestro Backend RESTful
        const [resUsers, resPets] = await Promise.all([
            fetch("/api/users", { headers: { Authorization: "Bearer " + token } }),
            fetch("/api/mascotas")
        ]);

        const dataUsers = await resUsers.json();
        const dataPets = await resPets.json();

        const usuarios = dataUsers.data || [];
        const mascotas = dataPets.data || [];

        // Inyectar contadores deshabilitando el ícono de carga (spinner)
        const countU = document.getElementById("countUsers");
        countU.className = "m-0 text-success fw-bold"; 
        countU.textContent = usuarios.length;

        const countP = document.getElementById("countPets");
        countP.className = "m-0 text-info fw-bold";
        countP.textContent = mascotas.length;

        // Extraer y dibujar los últimos 3 usuarios registrados
        const recientes = usuarios.sort((a, b) => b.id - a.id).slice(0, 3);
        const listaHtml = document.getElementById("ultimosUsuariosList");
        
        if (recientes.length === 0) {
            listaHtml.innerHTML = "<span class='text-muted'>No hay registros</span>";
        } else {
            listaHtml.innerHTML = recientes.map(u => `
                <div class="d-flex justify-content-between align-items-center border-bottom border-secondary pb-2 mb-2">
                    <div>
                        <strong>${u.nombre}</strong> <span class="badge" style="background:rgba(255,255,255,0.2)">${u.rol}</span>
                        <div class="text-white-50 small" style="font-size:0.8rem;">${u.email}</div>
                    </div>
                </div>
            `).join("");
        }
        
    } catch (error) {
        console.error("Error cargando dashboard:", error);
        document.getElementById("countUsers").textContent = "---";
        document.getElementById("countPets").textContent = "---";
    }
}

// Enlazar los métodos en la ventana global asegura que el atributo HTML 'onclick' no falle
window.irNotificaciones = irNotificaciones;

// Pequeño registro invisible por si queremos auditar los datos rápidos desde la ventana de F12
console.log("Sesión verificada y funcionando para:", user?.nombre);
