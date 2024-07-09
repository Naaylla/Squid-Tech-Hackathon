const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
const connexion = require('./utils/db')
const router_user = require('./routes/user.routes')
const router_chat = require('./routes/chat.routes')
const router_commentaire_like = require('./routes/commentaire_like.routes')
const router_commmentaire = require('./routes/commentaire.routes')
const router_event_activite = require('./routes/event_activite.routes')
const router_impact = require('./routes/impact.routes')
const router_like = require('./routes/like.routes')
const router_message = require('./routes/message.routes')
const router_friend = require('./routes/friend.routes')
const router_publication_file = require('./routes/publication_file.routes')
const router_publication_like = require('./routes/publication_like.routes')
const router_publication = require('./routes/publication.routes')
const router_user_publi = require('./routes/share_user_publi.routes')
const router_bloqued_user = require('./routes/blocked_user.routes')
const router_activite = require('./routes/activite.routes')
const router_chat_user = require('./routes/chat_user.routes')
const router_event_user = require('./routes/event_user.routes')
const router_event = require('./routes/event.routes')
const router_file_message = require('./routes/file_message.routes')
const router_file = require('./routes/file.routes')
const router_auth = require('./routes/auth.routes')
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
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: true
}));


app.use(express.json())






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




// ROUTES 



/**
 *  FAST DOCUMENTATION
 * How endpoint run ?
 * 
 * id_id1 = premier mot apres 'router_' que l'on trouve dans les variables des endpoints
 * id_id2 = deuxiemme mot apres 'router_' que l'on trouve dans les variables des endpoints
 * 
 * delete request ---- /routes_principal/delete/id_id1/id_id2
 * update request ---- /routes_principal/update/id_id1/id_id2
 * get specifique request    ---- /routes_principal/id_id1
 * get request    ---- /routes_principal
 * post request   ----/routes_principal/add
 */



// routes pour authentification 
app.use('/auth', router_auth)
// routes des activités qui sont ajouter aux évènements
app.use('/activite', router_activite)
// routes des utilisateurs bloquer 
app.use('/user_blocker/user_blocked', router_bloqued_user)
// routes des  utilisateurs d'une discussion 
app.use('/chat/user', router_chat_user)
// routes des discussions
app.use('/chat', router_chat)
// routes des likes d'un commentaire
app.use('/comment/likes', router_commentaire_like)
// routes des commentaires
app.use('/comment', router_commmentaire)
// routes des activités d'un evenement
app.use('/event/activities', router_event_activite)
// routes des utilisateurs participant a un evenement
app.use('/event/users', router_event_user)
// routes des evenements
app.use('/event', router_event)
// routes des fichiers d'un message
app.use('/message/files', router_file_message)
// routes vers les fichiers
app.use('/files', router_file)
// routes des listes d'amis 
app.use('/friend', router_friend)
// routes des impacts
app.use('/impact', router_impact)
// routes des likes
app.use('/likes', router_like)
// routes des messages
app.use('/message', router_message)
// routes des fichiers d'une publication
app.use('/publication/files', router_publication_file)
// routes des likes d'une publication
app.use('/publication/likes', router_publication_like)
// routes des publications
app.use('/publication', router_publication)
// routes des publications partager par l'utilisateur
app.use('/shared/user/publications', router_user_publi)
// routes des utlisateurs 
app.use('/users', router_user)
// Middleware pour la gestion des routes 404
app.use('/*', async (req, res, next) => {
    res.status(404).json({ message: 'Route not Found' });
});


