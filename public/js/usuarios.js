// --------------------------------------------------
// FUNCIÓN PARA CARGAR USUARIOS
// --------------------------------------------------

// Definimos función asíncrona para obtener usuarios desde el backend
async function cargarUsuarios() {

    // --------------------------------------------------
    // OBTENER TOKEN
    // --------------------------------------------------

    // Obtenemos el token guardado en el navegador (localStorage)
    const token = localStorage.getItem("token");

    // Validamos si NO existe token (usuario no autenticado)
    if (!token) {

        // Mostramos mensaje de error en pantalla
        mostrarMensaje("No autorizado", "danger");

        // Redirigimos al usuario al login
        window.location.href = "index.html";

        // Detenemos ejecución de la función
        return;
    }

    try {

        // --------------------------------------------------
        // PETICIÓN AL BACKEND
        // --------------------------------------------------

        // Realizamos petición GET a la API para obtener usuarios
        const res = await fetch("/api/users", {

            // Enviamos headers en la petición
            headers: {

                // Incluimos el token en formato Bearer para autenticación
                "Authorization": "Bearer " + token
            }
        });

        // Si el backend responde 401 (token inválido o expirado)
        if (res.status === 401) {

            // Eliminamos datos guardados del usuario
            localStorage.clear();

            // Redirigimos al login
            window.location.href = "index.html";

            // Detenemos ejecución
            return;
        }

        // Convertimos la respuesta a formato JSON
        const data = await res.json();

        // Validamos si la respuesta NO es correcta
        if (!res.ok || data.status !== "success") {

            // Mostramos mensaje de error
            mostrarMensaje(data.message || "Error al cargar usuarios", "danger");

            // Detenemos ejecución
            return;
        }

        // --------------------------------------------------
        // OBTENER CONTENEDOR HTML
        // --------------------------------------------------

        // Buscamos el elemento donde se mostrarán los usuarios
        const lista = document.getElementById("listaUsuarios");

        // Si no existe el elemento, evitamos error
        if (!lista) return;

        // Limpiamos el contenido previo
        lista.innerHTML = "";

        // Si el array de usuarios está vacío
        if (!data.data.length) {

            // Mostramos mensaje en pantalla
            lista.innerHTML = "<p>No hay usuarios</p>";

            // Detenemos ejecución
            return;
        }

        // --------------------------------------------------
        // RECORRER USUARIOS
        // --------------------------------------------------

        // Iteramos cada usuario recibido desde el backend
        data.data.forEach(usuario => {

            // Creamos un elemento <li>
            const li = document.createElement("li");

            // Le asignamos clases de Bootstrap
            li.className = "list-group-item";

            // Insertamos contenido dinámico con template string
            li.innerHTML = `
                <strong>${usuario.nombre}</strong> 
                
                <span class="badge bg-secondary ms-2">
                    ${usuario.rol}
                </span>

                <br>

                <small>📧 ${usuario.email}</small><br>
                <small>📞 ${usuario.telefono || "No registrado"}</small>

                <div class="mt-2 d-flex gap-2">

                    <select 
                        class="form-select form-select-sm w-auto"
                        onchange="cambiarRol(${usuario.id}, this.value)"
                    >
                        <option value="adoptante" ${usuario.rol === "adoptante" ? "selected" : ""}>Adoptante</option>
                        <option value="rescatista" ${usuario.rol === "rescatista" ? "selected" : ""}>Rescatista</option>
                        <option value="admin" ${usuario.rol === "admin" ? "selected" : ""}>Admin</option>
                    </select>

                    <button 
                        class="btn btn-danger btn-sm"
                        onclick="eliminarUsuario(${usuario.id})"
                    >
                        Eliminar
                    </button>

                </div>
            `;

            // Agregamos el elemento al DOM
            lista.appendChild(li);
        });

    } catch (error) {

        // Mostramos error en consola
        console.error(error);

        // Mostramos mensaje al usuario
        mostrarMensaje("Error al cargar usuarios", "danger");
    }
}


// --------------------------------------------------
// CAMBIAR ROL DE USUARIO
// --------------------------------------------------

// Función para actualizar el rol de un usuario
async function cambiarRol(userId, nuevoRol) {

    // Obtenemos token desde localStorage
    const token = localStorage.getItem("token");

    try {

        // Enviamos petición PUT al backend
        const res = await fetch(`/api/users/${userId}`, {

            // Método HTTP PUT
            method: "PUT",

            // Headers necesarios
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },

            // Enviamos el nuevo rol en formato JSON
            body: JSON.stringify({
                rol: nuevoRol
            })
        });

        // Convertimos respuesta a JSON
        const data = await res.json();

        // Validamos si hubo error
        if (!res.ok) {

            // Mostramos mensaje de error
            mostrarMensaje(data.message || "Error al actualizar rol", "danger");

            return;
        }

        // Mostramos mensaje de éxito
        mostrarMensaje("Rol actualizado correctamente");

    } catch (error) {

        // Mostramos error en consola
        console.error(error);

        // Mostramos error en pantalla
        mostrarMensaje("Error al cambiar rol", "danger");
    }
}


// --------------------------------------------------
// ELIMINAR USUARIO
// --------------------------------------------------

// Función para eliminar un usuario
async function eliminarUsuario(userId) {

    // Obtenemos token
    const token = localStorage.getItem("token");

    // Confirmación antes de eliminar
    if (!confirm("¿Seguro que quieres eliminar este usuario?")) return;

    try {

        // Enviamos petición DELETE
        const res = await fetch(`/api/users/${userId}`, {

            // Método HTTP DELETE
            method: "DELETE",

            // Enviamos token
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        // Convertimos respuesta a JSON
        const data = await res.json();

        // Validamos error
        if (!res.ok) {

            // Mostramos error
            mostrarMensaje(data.message || "Error al eliminar usuario", "danger");

            return;
        }

        // Mostramos éxito
        mostrarMensaje("Usuario eliminado correctamente");

        // Recargamos lista
        cargarUsuarios();

    } catch (error) {

        // Error en consola
        console.error(error);

        // Error visual
        mostrarMensaje("Error al eliminar usuario", "danger");
    }
}


// --------------------------------------------------
// AUTO CARGA
// --------------------------------------------------

// Ejecutamos la función automáticamente al cargar la página
cargarUsuarios();