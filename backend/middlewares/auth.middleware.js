const jwt = require('jsonwebtoken');
const connexion = require('../utils/db');


const verify_Token = async (req, res, next) => {
    // Récupérer le token depuis l'en-tête Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Access token manquant ou mal formé" });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Vérifier si la clé secrète existe
        if (!process.env.SECRETKEY) {
            throw new Error('Clé secrète non définie dans les variables d\'environnement');
        }

        // Vérifier le token JWT et décoder les données
        const decoded = jwt.verify(token, process.env.SECRETKEY);

        // Ajouter les données du token décodé à l'objet de demande pour une utilisation ultérieure
        req.user = decoded.user;
        // Si l'utilisateur est trouvé, passer à l'étape suivante
        next();
    } catch (error) {
        console.error('Erreur de vérification JWT :', error); // Journaliser l'erreur pour le débogage
        return res.status(403).json({ message: "Token invalide", error: error.message });
    }
};

const verifyAdminRole = (req, res, next) => {
    // Vérifier que les données utilisateur sont présentes dans la requête
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: "Accès refusé: Admin seulement" });
    }
    // Passer à l'étape suivante si l'utilisateur est un admin
    next();
};



module.exports = { verify_Token, verifyAdminRole }