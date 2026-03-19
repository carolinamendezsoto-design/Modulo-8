// --------------------------------------------------
// FUNCIÓN PARA CARGAR USUARIOS
// --------------------------------------------------

async function cargarUsuarios() {

    // Obtenemos token directamente (sin redeclarar variable global)
    const token = localStorage.getItem("token");

    // Si no hay token
    if (!token) {

        mostrarMensaje("No autorizado", "danger");

        // Redirigimos al login
        window.location.href = "index.html";

        return;
    }

    try {

        // Petición al backend
        const res = await fetch("/api/users", {

            headers: {
                "Authorization": "Bearer " + token
            }

        });

        // Si token inválido
        if (res.status === 401) {

            localStorage.removeItem("token");
            window.location.href = "index.html";
            return;
        }

        const data = await res.json();

        const lista = document.getElementById("listaUsuarios");

        if (!lista) return;

        lista.innerHTML = "";

        data.data.forEach(usuario => {

            const li = document.createElement("li");

            li.className = "list-group-item";

            li.innerHTML = `
                <strong>${usuario.nombre}</strong><br>
                <small>${usuario.email}</small>
            `;

            lista.appendChild(li);
        });

    } catch (error) {

        console.error(error);
        mostrarMensaje("Error al cargar usuarios", "danger");
    }
}


// --------------------------------------------------
// AUTO CARGA
// --------------------------------------------------

cargarUsuarios();