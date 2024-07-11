const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connexion = require('../utils/db');
const axios = require('axios');

const login = async (req, res) => {
    const { username, email, telephone, password, recaptchaToken } = req.body;

    // Vérifier les entrées
    if (!username && !email && !telephone) {
        return res.status(400).json({ message: 'Veuillez fournir un nom d’utilisateur, un email ou un téléphone.' });
    }
    if (!password) {
        return res.status(400).json({ message: 'Veuillez fournir un mot de passe.' });
    }
    if (!recaptchaToken) {
        return res.status(400).json({ message: 'Veuillez compléter le reCAPTCHA.' });
    }

    try {
        // Vérifier le token reCAPTCHA
        const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;
        await axios.post(verificationURL)
            .then(() => {


                // Requête SQL pour trouver l'utilisateur
                const sql = 'SELECT * FROM user WHERE (username_user = ? OR email_user = ? OR telephone_user = ?)';
                const values = [username, email, telephone];

                connexion.query(sql, values, async (err, rows) => {
                    if (err) {
                        return res.status(500).json({ message: "Erreur d'authentification.", err });
                    }

                    if (rows.length <= 0) {
                        return res.status(401).json({ message: "Nom d'utilisateur, email, ou téléphone invalide." });
                    }

                    const user = rows[0];

                    const passwordMatch = await bcrypt.compare(password, user.password_user);

                    if (!passwordMatch) {
                        return res.status(401).json({ message: "Mot de passe invalide." });
                    }

                    // Exclure l'email et le mot de passe de l'objet utilisateur
                    const { email_user, password_user, ...userWithoutSensitiveInfo } = user;

                    // Générer un token JWT avec les données utilisateur (sans email et mot de passe)
                    const Token = jwt.sign(userWithoutSensitiveInfo, `${process.env.JWT_SECRET_KEY}`);
                    if (res.status === 200) {
                        const SQL = `UPDATE TABLE USER SET status_user = active where id_user = ${userWithoutSensitiveInfo.id_user}`
                        connexion.query(SQL, async (err, result) => {
                            if (err) {
                                return res.status(500).json({ message: "Erreur d'authentification.", err });
                            }
                            res.status(200).json({ token: Token, user: userWithoutSensitiveInfo, message: user.username_user + " est connecté." });
                            res.status(200).json({ success: true, message: "Login successful" });
                        })
                    }
                    
                })

            });

    } catch (err) {
        return res.status(500).json({ message: "Une erreur s'est produite lors de la vérification reCAPTCHA.", err });
    }
};




module.exports = login;