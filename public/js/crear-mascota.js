// ------------------------------------------------------
// 🔐 OBTENER TOKEN Y USUARIO
// ------------------------------------------------------

// Rescatamos el token guardado para enviarlo al servidor
const token = localStorage.getItem("token");

// Declaramos la variable del usuario local
let user = null;

try {
    // Intentamos decodificar las credenciales que el navegador almacena
    user = JSON.parse(localStorage.getItem("user"));
} catch {
    // Si la decodificación falla, mantenemos sesión nula
    user = null;
}

// Convertimos a minúsculas y limpiamos espacios vacíos del rol
const rol = user?.rol?.toLowerCase()?.trim();

// ------------------------------------------------------
// 🚨 PROTECCIÓN DE RUTA
// ------------------------------------------------------

// Restringimos el acceso a personas invasoras que no tengan permiso de rescatista
if (!token || !user || rol !== "rescatista") {

    // Los mandamos fuera de inmediato a la página principal
    window.location.href = "index.html";
}


// ------------------------------------------------------
// 📸 PREVISUALIZAR IMAGEN ANTES DE SUBIR
// ------------------------------------------------------

// Escuchamos los cambios en nuestro input para seleccionar archivo visual
document.getElementById("imagen").addEventListener("change", e => {

    // Tomamos la primera fotografía de la lista seleccionada
    const file = e.target.files[0];

    // Si el usuario cancela su selección del explorador de archivos, no hacemos nada
    if (!file) return;

    // Verificamos que realmente se trate de un archivo de imagen (png, jpg, jpeg)
    if (!file.type.startsWith("image/")) {

        // Avisamos en la UI si intentan trampear subiendo pdfs o virus
        mostrarMensaje("El archivo debe ser una fotografía o imagen válida", "warning");
        return;
    }

    // Buscamos nuestra imagen de muestra prediseñada en el HTML
    const preview = document.getElementById("preview");

    // Creamos en memoria viva la foto seleccionada y la asignamos
    preview.src = URL.createObjectURL(file);
    
    // Mostramos la previsualización al rescatista con estilo visible
    preview.style.display = "block";
});


// ------------------------------------------------------
// 📩 ENVIAR SOLICITUD PARA CREAR LA MASCOTA
// ------------------------------------------------------

// Interrumpimos el flujo nativo de HTML e interceptamos el submit del formulario
document.getElementById("formMascota").addEventListener("submit", async e => {

    // Prevenimos que la página recargue, tomando el control absoluto con Javascript
    e.preventDefault();

    // Vinculamos de manera segura nuestros inputs recolectando sus valores reales sin espacios
    const nombreVal = document.getElementById("nombre").value.trim();
    const razaVal = document.getElementById("raza").value.trim();
    const aniosVal = document.getElementById("edadAnios").value.trim();
    const mesesVal = document.getElementById("edadMeses").value.trim();
    const porteSeleccionado = document.querySelector('input[name="porte"]:checked');
    const energiaSeleccionada = document.querySelector('input[name="energia"]:checked');
    
    // Si eligieron algo, le quitamos espacios vacíos, sino devolvemos texto vacío
    const porteVal = porteSeleccionado ? porteSeleccionado.value.trim() : "";
    const energiaVal = energiaSeleccionada ? energiaSeleccionada.value.trim() : "";
    const descripcionVal = document.getElementById("descripcion").value.trim();

    // Verificamos rígidamente si pasaron al menos un dato esencial por campo
    if (!nombreVal || !razaVal || (!aniosVal && !mesesVal) || !porteVal || !energiaVal || !descripcionVal) {
        
        // Lanzamos sugerencia amistosa
        mostrarMensaje("Debe completar todos los apartados obligatorios", "warning");
        return;
    }

    // Construimos dinámicamente el texto de la edad, juntando años y meses
    const edadFormateada = `${aniosVal ? aniosVal+" años" : ""} ${mesesVal ? mesesVal+" meses" : ""}`.trim();

    // Construimos la estructura de datos múltiples donde se admiten binarios (imágenes)
    const formData = new FormData();

    // Agregamos todas nuestras parejas clave -> valor
    formData.append("nombre", nombreVal);
    formData.append("raza", razaVal);
    formData.append("edad", edadFormateada);
    formData.append("porte", porteVal);
    formData.append("energia", energiaVal);
    formData.append("descripcion", descripcionVal);

    // Atrapamos la imagen real seleccionada
    const fileImage = document.getElementById("imagen").files[0];
    
    // Si hay una imagen lista la metemos a nuestro baúl de envío
    if (fileImage) {
        formData.append("imagen", fileImage);
    }

    try {

        // Hacemos el despacho por POST a nuestra ruta de mascotas protegida
        const res = await fetch("/api/mascotas", {
            method: "POST",

            // No establecemos application/json dado que usamos un formato multipart/form-data
            // el navegador lo hace automático al enviar un objeto FormData
            headers: {
                "Authorization": "Bearer " + token
            },
            
            // Cuerpo binario y de texto
            body: formData
        });

        // Desencriptamos la vuelta del backend
        const data = await res.json();

        // Validamos si la respuesta falló para derivar al manejador de errores
        if (!res.ok) throw new Error(data.message);

        // Disparamos éxito visual al rescatista de mascotas
        mostrarMensaje("Mascota publicada con todo el éxito 🐾", "success");

        // Después de un segundo enviamos al rescatista a su panel de control principal
        setTimeout(() => window.location.href = "rescatista.html", 1000);

    } catch (error) {

        // Avisamos a la consola para nosotros
        console.error("Fallo al publicar la mascota tierna:", error);
        
        // Notificamos a la interfaz que algo se rompió
        mostrarMensaje(error.message, "danger");
    }

});
