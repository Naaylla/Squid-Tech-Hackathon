const connexion = require("../utils/db");

// Ajouter un utilisateur bloqué
const add_bloqued_user = async (req, res) => {
    const { id_user_blocker, id_user_blocked } = req.body;
    const sql = 'INSERT INTO BLOCKED_USER (id_user_blocker, id_user_blocked) VALUES (?, ?)';
    const values = [id_user_blocker, id_user_blocked];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de l'ajout" });
        }
        res.status(200).json({ data: result, message: "Utilisateur bloquer avec succès" });
    });
};

// Supprimer un utilisateur bloqué
const delete_bloqued_user = async (req, res) => {
    const { id_user_blocker, id_user_blocked } = req.params;
    const sql = 'DELETE FROM BLOCKED_USER WHERE id_user_blocker = ? AND id_user_blocked = ?';

    connexion.query(sql, [id_user_blocker, id_user_blocked], (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la suppression" });
        }
        res.status(200).json({ data: result, message: "Supprimé avec succès" });
    });
};

// Mettre à jour un utilisateur bloqué
const update_bloqued_user = async (req, res) => {
    const { id_user_blocker, id_user_blocked } = req.params;
    const { id_new_user_blocked } = req.body;
    const sql = 'UPDATE BLOCKED_USER SET id_user_blocked = ? WHERE id_user_blocker = ? AND id_user_blocked = ? ';
    const values = [id_new_user_blocked, id_user_blocker, id_user_blocked];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la modification" });
        }
        res.status(200).json({ data: result, message: "Modifié avec succès" });
    });
};

// Obtenir tous les utilisateurs bloqués
const get_all_bloqued_user = async (req, res) => {
    const sql = 'SELECT * FROM BLOCKED_USER';

    connexion.query(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

// Obtenir un utilisateur bloqué par son ID
const get_bloqued_user = async (req, res) => {
    const { id_user_blocker } = req.params;
    const sql = 'SELECT * FROM BLOCKED_USER WHERE id_user_blocker = ? ';

    connexion.query(sql, [id_user_blocker], (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

module.exports = {
    add_bloqued_user,
    delete_bloqued_user,
    update_bloqued_user,
    get_all_bloqued_user,
    get_bloqued_user
};
