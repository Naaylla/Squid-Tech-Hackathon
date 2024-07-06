const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
const connexion = require('./utils/db')
//
app.use(bodyParser.json())
//
app.use(bodyParser.urlencoded({ extended: true }))



// CORS configuration (ajout des liens ayant les privilèges d'utiliser l'api)
const allowedOrigins = [
    'http://localhost:5173',
    process.env.BASE_URL
];


app.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true
}));


app.use(express.json())




// Middleware 404 -- si la route existe pas ça log cette erreur 
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});



// Connexion a la base de donnée
connexion.connect((err) => {
    if (err) {
        console.log("Erreur de connection a la base de donnée");
        return;
    } else {
        console.log("Connexion réussie à la base de données");
    }
});


// Server mis à l'écoute

app.listen(process.env.PORT, (error) => {
    if (error) {
        return console.log('Erreur lors du demarrage du server');
    }
    console.log('Demarrage du serveur sur le port : ' + process.env.PORT || 8080);
})


