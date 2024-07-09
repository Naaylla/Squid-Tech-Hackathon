const bcrypt = require('bcrypt')
const connexion = require("../utils/db");

// Ajouter un utilisateur
const add_user = async (req, res) => {
    const { firstname_user, lastname_user, email_user, username_user, password_user, pays_user, commune_user, telephone_user } = req.body;

    try {
        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password_user, 10); // 10 est le nombre de tours de salage

        const sql = 'INSERT INTO USER (firstname_user, lastname_user, email_user, username_user, password_user, pays_user, commune_user, telephone_user) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [firstname_user, lastname_user, email_user, username_user, hashedPassword, pays_user, commune_user, telephone_user];

        connexion.query(sql, values, (err, rows) => {
            if (err) {
                return res.status(500).json({ message: "Erreur lors de l'ajout de l'utilisateur, vérifiez les données que vous avez entrées. Elles sont peut-être existantes." });
            }
            const userWithoutPassword = { ...req.body };
            delete userWithoutPassword.password_user;
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
    const { id_user, firstname_user, lastname_user, email_user, username_user, password_user, pays_user, commune_user, telephone_user } = req.body;

    try {
        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password_user, 10); // 10 est le nombre de tours de salage

        const sql = 'UPDATE USER SET firstname_user = ?, lastname_user = ?, email_user = ?,  username_user = ?, password_user = ?, pays_user = ?, commune_user = ?, telephone_user = ? WHERE id_user = ?';
        const values = [firstname_user, lastname_user, email_user, username_user, hashedPassword, pays_user, commune_user, telephone_user, id_user];

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
