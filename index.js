const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 8000;
let serveur = http.createServer((requete, reponse) => {
    console.log(requete.url);
    if (requete.url === '/') {
        let fileName = path.join(__dirname, 'pagesWeb', 'index.html');
        affichePageWeb(fileName, reponse);
    } else {
        let fileName = path.join(__dirname, 'pagesWeb', requete.url);
        affichePageWeb(fileName, reponse);
    }
});
serveur.listen(PORT, () => console.log('Le service est demarre sur le port=', PORT));

function affichePageWeb(fileName, reponse) {
    // console.log('dans fonction affichePageWeb fileName=', fileName);
    let typeFichier = path.extname(fileName);
    // console.log('type de fichier=', typeFichier);
    let typeContenu = 'text/html';
    switch (typeFichier) {
        case '.css':
            typeContenu = 'text/css';
            break;
        case '.js':
            typeContenu = 'text/javascript';
            break;
        case '.json':
            typeContenu = 'application/json';
            break;            
        case '.png':
            typeContenu = 'image/png';
            break;            
        case '.gif':
            typeContenu = 'image/gif';
            break;      
        case '.jpg':
            typeContenu = 'image/jpg';
            break;  
        case '.svg':
            typeContenu = 'image/svg+xml';
            break;  
        case '.ico':
            typeContenu = 'image/x-icon';
            break;
    }
    console.log('trace passe ici ***********');
    fs.readFile( fileName, (err, contenu) => {
        if (err) {
            if (err.code == 'ENOENT') { // fichier non trouve
                reponse.writeHead(404, { 'Content-type': 'text/html' });
                reponse.write('<h1>page introuvable</h1>');
                reponse.end();
            } else {
                reponse.writeHead(500);
                reponse.write(`Erreur du serveur code: ${err.code}`);
                reponse.end();
            }
        } else {
            reponse.writeHead(200, { 'Content-type': typeContenu});
            reponse.write(contenu, 'utf-8');
            reponse.end();
        }
    });
}