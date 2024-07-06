const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')









app.listen(process.env.PORT || 3000, (err) => {
    if (err) {
        return console.log("Erreur lors du démarrage du serveur");
    }
    console.log("Server en marche sur le port : " + process.env.PORT || 3000);
})