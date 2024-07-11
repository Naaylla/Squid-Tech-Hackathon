const connexion = require("../utils/db");

// Ajouter un message
const add_message = async (req, res) => {
    const { id_chat, id_user, message_content } = req.body;
    const sql = 'INSERT INTO MESSAGE (id_chat, id_user , message_content) VALUES (?, ? , ?)';
    const values = [id_chat, id_user, message_content];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de l'ajout du message" });
        }
        res.status(200).json({ data: result, message: "Ajout avec succès" });
    });
};

// Supprimer un message
const delete_message = async (req, res) => {
    const { id_message } = req.params;
    const sql = 'DELETE FROM MESSAGE WHERE id_message = ?';

    connexion.query(sql, [id_message], (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la suppression du message" });
        }
        res.status(200).json({ data: result, message: "Supprimé avec succès" });
    });
};

// Mettre à jour un message
const update_message = async (req, res) => {
    const { id_message } = req.params;
    const { message_content } = req.body;
    const sql = 'UPDATE MESSAGE SET message_content = ?, date_time_updated_message = NOW() WHERE id_message = ?';
    const values = [message_content, id_message];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la modification du message" });
        }
        res.status(200).json({ data: result, message: "Modifié avec succès" });
    });
};

// Obtenir tous les messages d'utilisateurs
const get_all_message = async (req, res) => {
    const sql = 'SELECT * FROM MESSAGE';

    connexion.query(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection des messages" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

// Obtenir les messages d'un utilisateurs par son ID
const get_message = async (req, res) => {
    const { id_message } = req.params;
    const sql = 'SELECT * FROM MESSAGE WHERE id_message = ?';

    connexion.query(sql, [id_message], (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection du message" });
        }
        res.status(200).json({ data: rows[0], message: "Sélectionné avec succès" });
    });
};



module.exports = {
    add_message,
    delete_message,
    update_message,
    get_all_message,
    get_message
};
