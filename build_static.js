const fs = require('fs');

async function build() {
    try {
        const html = fs.readFileSync('public/mascotas.html', 'utf-8');
        
        // Fetch real pets from local API
        const res = await fetch('http://localhost:3000/api/mascotas');
        const data = await res.json();
        const mascotas = data.data || [];
        
        let cardsHtml = '';
        mascotas.forEach(m => {
            const imagenUrl = m.imagen && m.imagen !== 'default.jpg' ? `http://localhost:3000/uploads/${m.imagen}` : "http://localhost:3000/img/Huellitas_Ultra_Premium.png";
            cardsHtml += `
                <div class="col-md-4 mb-4">
                    <div class="card p-3 text-white h-100 d-flex flex-column" style="border-radius:20px; backdrop-filter:blur(12px); background:rgba(0,0,0,0.6); border:1px solid rgba(255,255,255,0.2); box-shadow:0 15px 40px rgba(0,0,0,0.4);">
                        <img src="${imagenUrl}" class="img-fluid rounded mb-3" style="height: 200px; object-fit: cover; border-radius: 15px;">
                        <h4 class="fw-bold">${m.nombre}</h4>
                        <div class="mb-3">
                            <span class="badge bg-primary me-1">${m.raza || "Mestizo"}</span>
                            <span class="badge bg-info text-dark me-1">${m.edad}</span>
                            <span class="badge bg-secondary me-1">Tamaño ${m.porte}</span>
                            <span class="badge bg-warning text-dark">Energía ${m.energia}</span>
                        </div>
                        <p class="flex-grow-1">${m.descripcion || ""}</p>
                        <button class="btn btn-success w-100 fw-bold mt-auto" style="border-radius:10px;">Adoptar</button>
                    </div>
                </div>
            `;
        });

        // Inject populated grid
        let newHtml = html.replace('<div id="contenedorMascotas" class="row"></div>', `<div id="contenedorMascotas" class="row">${cardsHtml}</div>`);
        
        // Remove auth scripts that cause unwanted headless redirect
        newHtml = newHtml.replace('<script src="js/auth.js"></script>', '');
        newHtml = newHtml.replace('<script src="js/mascota.js"></script>', '');
        
        // Set explicit names
        newHtml = newHtml.replace('<span id="nombreUsuario" class="fw-bold"></span>', '<span class="fw-bold">👤 Adopta Bot</span>');

        fs.writeFileSync('mascotas_static.html', newHtml);
        console.log("STATIC HTML BUILT!");
        process.exit(0);
    } catch(e) {
        console.error(e);
        process.exit(1);
    }
}
build();
