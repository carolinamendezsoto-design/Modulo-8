const { Solicitud, Notificacion } = require('./models');
const fs = require('fs');

async function run() {
    try {
        // Generar solicitud real en BD para consistencia
        await Solicitud.create({
            mascotaId: 4, 
            adoptanteId: 9, 
            mensaje: 'Edad del adoptante: 25\nExperiencia previa: Sí\nEspacio en casa: Patio grande',
            estado: 'pendiente'
        });
        
        // Generar notificacion real en BD
        await Notificacion.create({
            userId: 3,
            mensaje: 'Nueva solicitud de adopción para tu mascota Mirana 🐾',
            tipo: 'solicitud',
            leido: false,
            enlace: 'postulantes.html'
        });

        // ============================================
        // Vista 1: Rescatista con Campana de Notificación Activa
        // ============================================
        let rescatistaHtml = fs.readFileSync('public/rescatista.html', 'utf-8');
        rescatistaHtml = rescatistaHtml.replace(
            '<span id="contadorNoti" class="badge bg-danger" style="position:absolute; top:-8px; right:-10px; display:none;"></span>',
            '<span id="contadorNoti" class="badge bg-danger" style="position:absolute; top:-8px; right:-10px; display:inline-block;">1</span>'
        );
        rescatistaHtml = rescatistaHtml.replace('id="campana"', 'id="campana" class="campana-activa"');
        rescatistaHtml = rescatistaHtml.replace('<span id="nombreUsuario" class="fw-bold"></span>', '<span class="fw-bold">👤 Rescate Bot</span>');
        
        rescatistaHtml = rescatistaHtml.replace('<script src="js/auth.js"></script>', '');
        rescatistaHtml = rescatistaHtml.replace('<script src="js/rescatista.js"></script>', '');
        
        let petCard = `
            <div class="col-md-4 mb-4">
                <div class="card p-3 text-white h-100 d-flex flex-column" style="border-radius:20px; backdrop-filter:blur(12px); background:rgba(0,0,0,0.6); border:1px solid rgba(255,255,255,0.2); box-shadow:0 15px 40px rgba(0,0,0,0.4);">
                    <img src="http://localhost:3000/uploads/1774304617904-Mirana.webp" class="img-fluid rounded mb-3" style="height: 200px; object-fit: cover; border-radius: 15px;">
                    <h4 class="fw-bold">Mirana</h4>
                    <span class="badge bg-warning text-dark mb-3 p-2 font-monospace">1 Postulante Pendiente ⌛</span>
                    <button class="btn btn-primary mt-auto" style="border-radius:10px;">Revisar Postulantes</button>
                    <button class="btn btn-warning mt-2 text-dark fw-bold" style="border-radius:10px;">Editar Mascota</button>
                </div>
            </div>`;
        rescatistaHtml = rescatistaHtml.replace('<div id="misMascotas" class="row mt-4"></div>', `<div id="misMascotas" class="row mt-4">${petCard}</div>`);
        fs.writeFileSync('rescatista_static.html', rescatistaHtml);


        // ============================================
        // Vista 2: Centro de Notificaciones
        // ============================================
        let notiHtml = fs.readFileSync('public/notificaciones.html', 'utf-8');
        let notiList = `
            <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center mb-3 p-3 shadow-lg" style="background: rgba(255,200,0,0.15); color: white; border-radius: 12px; border: 1px solid rgba(255,193,7,0.5);">
                <div style="cursor:pointer;" class="w-100">
                    <h5 class="fw-bold text-warning mb-1">🛑 ¡NUEVA ALERTA DE ADOPCIÓN!</h5>
                    <span style="font-size:1.1rem;">Nueva solicitud de adopción recibida para tu mascota <b>Mirana 🐾</b></span>
                    <div class="text-white-50 small mt-2">Hace unos instantes • Adoptante: Adopta Bot</div>
                </div>
                <button class="btn btn-sm btn-outline-light rounded-pill px-3 py-2 ms-3" style="min-width: 140px;">Marcar leído ✓</button>
            </div>
        `;
        notiHtml = notiHtml.replace('<div id="listaNotificaciones" class="list-group"></div>', `<div id="listaNotificaciones" class="list-group">${notiList}</div>`);
        notiHtml = notiHtml.replace('<script src="js/auth.js"></script>', '');
        notiHtml = notiHtml.replace('<script src="js/notificaciones.js"></script>', '');
        fs.writeFileSync('notificaciones_static.html', notiHtml);

        console.log("NOTIFICATIONS HTML BUILT!");
        process.exit(0);
    } catch(e) {
        console.error(e);
        process.exit(1);
    }
}
run();
