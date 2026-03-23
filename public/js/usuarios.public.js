// --------------------------------------------------
// FUNCIÓN PARA CARGAR USUARIOS
// --------------------------------------------------

// Función async que obtiene usuarios desde el backend
async function cargarUsuarios() {

    // --------------------------------------------------
    // OBTENER TOKEN
    // --------------------------------------------------

    // Recuperamos token desde localStorage
    const token = localStorage.getItem("token");

    // Validamos que exista
    if (!token) {
        mostrarMensaje("No autorizado", "danger");
        window.location.href = "index.html";
        return;
    }

    try {

        // --------------------------------------------------
        // PETICIÓN AL BACKEND
        // --------------------------------------------------

        const res = await fetch("/api/users", {
            headers: {
                "Authorization": "Bearer " + token // enviamos token
            }
        });

        // Si token inválido o expirado
        if (res.status === 401) {
            localStorage.clear();
            window.location.href = "index.html";
            return;
        }

        // Convertimos respuesta
        const data = await res.json();

        // Validamos respuesta
        if (!res.ok || data.status !== "success") {
            mostrarMensaje(data.message || "Error al cargar usuarios", "danger");
            return;
        }

        // --------------------------------------------------
        // OBTENER CONTENEDOR
        // --------------------------------------------------

        const lista = document.getElementById("listaUsuarios");

        // Si no existe el contenedor, evitamos error
        if (!lista) return;

        // Limpiamos contenido anterior
        lista.innerHTML = "";

        // Si no hay usuarios
        if (!data.data.length) {
            lista.innerHTML = "<p>No hay usuarios</p>";
            return;
        }

        // --------------------------------------------------
        // RECORRER USUARIOS
        // --------------------------------------------------

        data.data.forEach(usuario => {

            // Creamos elemento <li>
            const li = document.createElement("li");

            // Le agregamos clase Bootstrap
            li.className = "list-group-item";

            // Insertamos HTML dinámico
            li.innerHTML = `
                <strong>${usuario.nombre}</strong> 
                
                <span class="badge bg-secondary ms-2">
                    ${usuario.rol}
                </span>

                <br>

                <small>📧 ${usuario.email}</small><br>
                <small>📞 ${usuario.telefono || "No registrado"}</small>

                <div class="mt-2 d-flex gap-2">

                    <!-- SELECT PARA CAMBIAR ROL -->
                    <select 
                        class="form-select form-select-sm w-auto"
                        onchange="cambiarRol(${usuario.id}, this.value)"
                    >
                        <option value="adoptante" ${usuario.rol === "adoptante" ? "selected" : ""}>Adoptante</option>
                        <option value="rescatista" ${usuario.rol === "rescatista" ? "selected" : ""}>Rescatista</option>
                        <option value="admin" ${usuario.rol === "admin" ? "selected" : ""}>Admin</option>
                    </select>

                    <!-- BOTÓN ELIMINAR -->
                    <button 
                        class="btn btn-danger btn-sm"
                        onclick="eliminarUsuario(${usuario.id})"
                    >
                        Eliminar
                    </button>

                </div>
            `;

            // Agregamos al DOM
            lista.appendChild(li);
        });

    } catch (error) {

        // Error inesperado
        console.error(error);

        mostrarMensaje("Error al cargar usuarios", "danger");
    }
}


// --------------------------------------------------
// CAMBIAR ROL DE USUARIO
// --------------------------------------------------

// Función para actualizar rol
async function cambiarRol(userId, nuevoRol) {

    // Obtenemos token
    const token = localStorage.getItem("token");

    try {

        // Petición PUT al backend
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

        // Validamos respuesta
        if (!res.ok) {
            mostrarMensaje(data.message || "Error al actualizar rol", "danger");
            return;
        }

        mostrarMensaje("Rol actualizado correctamente");

    } catch (error) {

        console.error(error);

        mostrarMensaje("Error al cambiar rol", "danger");
    }
}


// --------------------------------------------------
// ELIMINAR USUARIO
// --------------------------------------------------

// Función para eliminar usuario
async function eliminarUsuario(userId) {

    // Obtenemos token
    const token = localStorage.getItem("token");

    // Confirmación antes de eliminar
    if (!confirm("¿Seguro que quieres eliminar este usuario?")) {
        return;
    }

    try {

        // Petición DELETE
        const res = await fetch(`/api/users/${userId}`, {

            method: "DELETE",

            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const data = await res.json();

        // Validamos respuesta
        if (!res.ok) {
            mostrarMensaje(data.message || "Error al eliminar usuario", "danger");
            return;
        }

        mostrarMensaje("Usuario eliminado correctamente");

        // Recargamos lista
        cargarUsuarios();

    } catch (error) {

        console.error(error);

        mostrarMensaje("Error al eliminar usuario", "danger");
    }
}


// --------------------------------------------------
// AUTO CARGA
// --------------------------------------------------

// Ejecutamos automáticamente al cargar la página
cargarUsuarios();