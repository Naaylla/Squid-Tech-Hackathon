const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connexion = require('../config/database');

const login = async (req, res) => {
    const loginData = req.body;
    const sql = 'SELECT username, password FROM admin WHERE username = ?';
    const values = [loginData.username];

    connexion.query(sql, values, async (err, rows) => {
        if (err) {
            return res.status(500).json({ message: "Erreur d'authentification", err });
        }

        if (rows.length === 0) {
            return res.status(401).json({ message: "Nom d'utilisateur ou mot de passe invalide" });
        }

        const user = rows[0];

        try {
            const passwordMatch = await bcrypt.compare(loginData.password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({ message: "Nom d'utilisateur ou mot de passe invalide" });
            }

            // Générer un token JWT
            const token = jwt.sign({ user: user.username }, process.env.SECRETKEY);
            res.status(200).json({ token: token, message: user.username + " est connecter" });

        } catch (err) {
            return res.status(500).json({ message: "Une erreur c'est produite", err });
        }
    });
};

module.exports = login;