const connexion = require("../utils/db");

// Ajouter un chat
const add_chat = async (req, res) => {
    const sql = 'INSERT INTO CHAT () VALUES ()'; // Ne pas spécifier le type_chat ici
    const values = [];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de l'ajout" });
        }
        res.status(200).json({ data: result, message: "Ajout avec succès" });
    });
};


// Supprimer un chat
const delete_chat = async (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM CHAT WHERE id_chat = ?';

    connexion.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la suppression" });
        }
        res.status(200).json({ data: result, message: "Supprimé avec succès" });
    });
};

// Mettre à jour un chat
const update_chat = async (req, res) => {
    const { id } = req.params;
    const { type_chat, nom_chat } = req.body; // Ajoutez d'autres champs nécessaires ici
    const sql = 'UPDATE CHAT SET type_chat = ?, nom_chat = ? WHERE id_chat = ?'; // Ajoutez d'autres colonnes nécessaires ici
    const values = [type_chat, nom_chat, id];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la modification" });
        }
        res.status(200).json({ data: result, message: "Modifié avec succès" });
    });
};

// Obtenir tous les chats
const get_all_chat = async (req, res) => {
    const sql = 'SELECT * FROM CHAT';

    connexion.query(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

// Obtenir un chat par son ID
const get_chat = async (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM CHAT WHERE id_chat = ?';

    connexion.query(sql, [id], (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

module.exports = {
    add_chat,
    delete_chat,
    update_chat,
    get_all_chat,
    get_chat
};
