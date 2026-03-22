// --------------------------------------------------
// FUNCIÓN PARA CARGAR USUARIOS
// --------------------------------------------------

async function cargarUsuarios() {

    // Obtenemos token
    const token = localStorage.getItem("token");

    // Validación
    if (!token) {
        mostrarMensaje("No autorizado", "danger");
        window.location.href = "index.html";
        return;
    }

    try {

        // Petición
        const res = await fetch("/api/users", {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        // Token inválido
        if (res.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "index.html";
            return;
        }

        const data = await res.json();

        const lista = document.getElementById("listaUsuarios");

        if (!lista) return;

        lista.innerHTML = "";

        // --------------------------------------------------
        // RECORRER USUARIOS
        // --------------------------------------------------

        data.data.forEach(usuario => {

            const li = document.createElement("li");
            li.className = "list-group-item";

            li.innerHTML = `
                <strong>${usuario.nombre}</strong> 
                <span class="badge bg-secondary ms-2">
                    ${usuario.rol}
                </span>
                <br>

                <small>📧 ${usuario.email}</small><br>
                <small>📞 ${usuario.telefono || "No registrado"}</small>

                <div class="mt-2 d-flex gap-2">

                    <!-- CAMBIAR ROL -->
                    <select 
                        class="form-select form-select-sm w-auto"
                        onchange="cambiarRol(${usuario.id}, this.value)"
                    >
                        <option value="adoptante">Adoptante</option>
                        <option value="rescatista">Rescatista</option>
                        <option value="admin">Admin</option>
                    </select>

                    <!-- ELIMINAR -->
                    <button 
                        class="btn btn-danger btn-sm"
                        onclick="eliminarUsuario(${usuario.id})"
                    >
                        Eliminar
                    </button>

                </div>
            `;

            lista.appendChild(li);
        });

    } catch (error) {
        console.error(error);
        mostrarMensaje("Error al cargar usuarios", "danger");
    }
}


// --------------------------------------------------
// CAMBIAR ROL
// --------------------------------------------------

async function cambiarRol(userId, nuevoRol) {

    const token = localStorage.getItem("token");

    try {

        const res = await fetch(`/api/users/${userId}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },

            body: JSON.stringify({
                rol: nuevoRol
            })
        });

        const data = await res.json();

        mostrarMensaje("Rol actualizado");

    } catch (error) {
        console.error(error);
        mostrarMensaje("Error al cambiar rol", "danger");
    }
}


// --------------------------------------------------
// ELIMINAR USUARIO
// --------------------------------------------------

async function eliminarUsuario(userId) {

    const token = localStorage.getItem("token");

    // Confirmación
    if (!confirm("¿Seguro que quieres eliminar este usuario?")) {
        return;
    }

    try {

        const res = await fetch(`/api/users/${userId}`, {

            method: "DELETE",

            headers: {
                "Authorization": "Bearer " + token
            }

        });

        const data = await res.json();

        mostrarMensaje("Usuario eliminado");

        // Recargar lista
        cargarUsuarios();

    } catch (error) {

        console.error(error);
        mostrarMensaje("Error al eliminar", "danger");
    }
}


// --------------------------------------------------
// AUTO CARGA
// --------------------------------------------------

cargarUsuarios();