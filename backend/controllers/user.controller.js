const bcrypt = require('bcrypt')
const connexion = require("../utils/db");

// Ajouter un utilisateur

const add_user = async (req, res) => {
    const { firstname, lastname, email, username, password, pays, commune, telephone, gender, date_naissance } = req.body;

    try {
        // Vérifier que le mot de passe est bien présent dans req.body
        if (!password) {
            return res.status(400).json({ message: "Le champ 'password' est requis." });
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10); // 10 est le nombre de tours de salage

        // Log pour débogage
        console.log(`Password received: ${password}`);
        console.log(`Hashed password: ${hashedPassword}`);

        const sql = 'INSERT INTO USER (firstname_user, lastname_user, email_user, username_user, password_user, pays_user, commune_user, telephone_user, gender_user, date_naissance_user) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [firstname, lastname, email, username, hashedPassword, pays, commune, telephone, gender, date_naissance];

        connexion.query(sql, values, (err, rows) => {
            if (err) {
                return res.status(500).json({ message: "Erreur lors de l'ajout de l'utilisateur, vérifiez les données que vous avez entrées. Elles sont peut-être existantes ou incohérentes.", error: err });
            }
            const userWithoutPassword = { ...req.body };
            delete userWithoutPassword.password;
            res.status(200).json({ data: userWithoutPassword, message: "Ajout avec succès" });
        });
    } catch (err) {
        res.status(500).json({ data: err, message: "Erreur lors du hachage du mot de passe" });
    }
};


// Supprimer un utilisateur par son ID
const delete_user = async (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM USER WHERE id_user = ?';

    connexion.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la suppression de l'utilisateur" });
        }
        res.status(200).json({ data: result, message: "Supprimé avec succès" });
    });
};

// Mettre à jour un utilisateur
const update_user = async (req, res) => {
    const { id_user, firstname_user, lastname_user, email_user, username_user, password_user, pays_user, commune_user, telephone_user, gender_user, date_naissance_user } = req.body;

    try {
        // Vérifier si le mot de passe est fourni pour le hasher
        let hashedPassword = password_user;
        if (password_user) {
            hashedPassword = await bcrypt.hash(password_user, 10);
        }

        const sql = 'UPDATE USER SET firstname_user = ?, lastname_user = ?, email_user = ?, username_user = ?, password_user = ?, pays_user = ?, commune_user = ?, telephone_user = ?, gender_user = ?, date_naissance_user = ? WHERE id_user = ?';
        const values = [firstname_user, lastname_user, email_user, username_user, hashedPassword, pays_user, commune_user, telephone_user, gender_user, date_naissance_user, id_user];

        connexion.query(sql, values, (err, result) => {
            if (err) {
                return res.status(500).json({ data: err, message: "Erreur lors de la modification de l'utilisateur" });
            }
            res.status(200).json({ data: result, message: "Modifié avec succès" });
        });
    } catch (err) {
        res.status(500).json({ data: err, message: "Erreur lors du hachage du mot de passe" });
    }
};


// Obtenir tous les utilisateurs
const get_all_user = async (req, res) => {
    const sql = 'SELECT * FROM USER';

    connexion.query(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection des utilisateurs" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

// Obtenir un utilisateur par son ID
const get_user = async (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM USER WHERE id_user = ?';

    connexion.query(sql, [id], (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection de l'utilisateur" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

module.exports = {
    add_user,
    delete_user,
    update_user,
    get_all_user,
    get_user
};
