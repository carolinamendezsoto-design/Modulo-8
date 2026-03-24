const { Mascota } = require('./models');
const fs = require('fs');

async function run() {
    try {
        fs.copyFileSync("C:\\Users\\carol\\.gemini\\antigravity\\brain\\7bc290b7-b725-46d5-bd48-4c283ea41fed\\firu_dog_1774327785125.png", "public/uploads/firu_dog.png");
        fs.copyFileSync("C:\\Users\\carol\\.gemini\\antigravity\\brain\\7bc290b7-b725-46d5-bd48-4c283ea41fed\\firulais_test_dog_1774327802481.png", "public/uploads/firulais_test.png");

        await Mascota.destroy({ where: { id: 1 } }); // Borrar duplicidad 
        await Mascota.update({ imagen: 'firu_dog.png' }, { where: { id: 2 } }); // Actualizar 'Firu'
        await Mascota.update({ imagen: 'firulais_test.png' }, { where: { id: 3 } }); // Actualizar 'Firulais Test'
        
        console.log("DB EXACTAMENTE LIMPIA!");
        process.exit(0);
    } catch(e) {
        console.error(e);
        process.exit(1);
    }
}
run();
