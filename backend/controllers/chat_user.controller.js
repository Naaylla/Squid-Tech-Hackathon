const connexion = require("../utils/db");

// Ajouter un utilisateur à un chat
const add_chat_user = async (req, res) => {
    const { id_chat, id_user } = req.body;
    const sql = 'INSERT INTO CHAT_USER (id_chat, id_user) VALUES (?, ?)';
    const values = [id_chat, id_user];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de l'ajout" });
        }
        res.status(200).json({ data: result, message: "Ajout avec succès" });
    });
};

// Supprimer un utilisateur d'un chat
const delete_chat_user = async (req, res) => {
    const { id_chat, id_user } = req.params;
    const sql = 'DELETE FROM CHAT_USER WHERE id_chat = ? AND id_user = ?';

    connexion.query(sql, [id_chat, id_user], (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la suppression" });
        }
        res.status(200).json({ data: result, message: "Supprimé avec succès" });
    });
};

// Mettre à jour un utilisateur dans un chat
const update_chat_user = async (req, res) => {
    const { id_chat, id_user } = req.body;
    const sql = 'UPDATE CHAT_USER SET id_user = ? WHERE id_chat = ?';
    const values = [id_user, id_chat];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la modification" });
        }
        res.status(200).json({ data: result, message: "Modifié avec succès" });
    });
};

// Obtenir tous les utilisateurs de chat
const get_all_chat_user = async (req, res) => {
    const sql = 'SELECT * FROM CHAT_USER';

    connexion.query(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

// Obtenir un utilisateur de chat par son ID
const get_chat_user = async (req, res) => {
    const { id_chat, id_user } = req.params;
    const sql = 'SELECT * FROM CHAT_USER WHERE id_chat = ? AND id_user = ?';

    connexion.query(sql, [id_chat, id_user], (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

module.exports = {
    add_chat_user,
    delete_chat_user,
    update_chat_user,
    get_all_chat_user,
    get_chat_user
};
