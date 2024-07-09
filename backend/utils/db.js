const mysql = require('mysql2');
const dotenv = require('dotenv');

// Charge le fichier .env
dotenv.config();

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USERNAME:', process.env.DB_USERNAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

const connexion = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "recyclage",
    connectTimeout: 10000 // 10 seconds timeout
});

connexion.connect((err) => {
    if (err) {
        console.error('Erreur de connexion: ' + err.stack);
        return;
    }
    console.log('Connecté en tant que id ' + connexion.threadId);
});

module.exports = connexion;