// ------------------------------------------------------
// NAVBAR GLOBAL
// ------------------------------------------------------

// Función que renderiza el navbar en todas las páginas
function renderNavbar() {

    // Obtenemos usuario desde localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    // Obtenemos token
    const token = localStorage.getItem("token");

    // Si no hay sesión → no renderizamos
    if (!token || !user) return;

    // Insertamos navbar en el div #navbar
    document.getElementById("navbar").innerHTML = `

        <div class="d-flex justify-content-between align-items-center mb-4">

            <!-- IZQUIERDA -->
            <h4>🐾 Huellitas de Amor</h4>

            <!-- DERECHA -->
            <div class="d-flex align-items-center gap-3">

                <!-- 👤 USUARIO -->
                <span class="fw-bold">
                    👤 ${user.nombre || "Usuario"}
                </span>

                <!-- 🔔 CAMPANITA -->
                <div id="campana" style="position:relative; cursor:pointer;" onclick="irNotificaciones()">

                    <span style="font-size:24px;">🔔</span>

                    <span id="contadorNoti"
                        class="badge bg-danger"
                        style="position:absolute; top:-8px; right:-10px; display:none;">
                    </span>

                </div>

                <!-- LOGOUT -->
                <button class="btn btn-danger btn-sm" onclick="logout()">
                    Cerrar sesión
                </button>

            </div>

        </div>
    `;
}


// ------------------------------------------------------
// CARGAR NOTIFICACIONES EN NAVBAR
// ------------------------------------------------------

async function cargarNotificacionesNavbar() {

    // Obtenemos token
    const token = localStorage.getItem("token");

    // Elementos
    const contador = document.getElementById("contadorNoti");
    const campana = document.getElementById("campana");

    // Si no existen aún → salir
    if (!contador || !campana) return;

    try {

        // Llamada API
        const res = await fetch("/api/notificaciones", {
            headers: { Authorization: "Bearer " + token }
        });

        const data = await res.json();

        const noLeidas = data.data.filter(n => !n.leido);

        // Si hay notificaciones
        if (noLeidas.length > 0) {

            contador.style.display = "inline-block";
            contador.textContent = noLeidas.length;

            campana.classList.add("campana-activa");

        } else {

            contador.style.display = "none";

            campana.classList.remove("campana-activa");
        }

    } catch (error) {

        console.error(error);
    }
}


// ------------------------------------------------------
// IR A NOTIFICACIONES
// ------------------------------------------------------

function irNotificaciones() {

    window.location.href = "notificaciones.html";
}


// ------------------------------------------------------
// INIT NAVBAR
// ------------------------------------------------------

function initNavbar() {

    renderNavbar(); // dibuja navbar

    setTimeout(() => {
        cargarNotificacionesNavbar(); // carga contador
    }, 100);
}