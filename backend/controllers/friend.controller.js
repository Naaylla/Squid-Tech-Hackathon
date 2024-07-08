const connexion = require("../utils/db");

// Ajouter un ami
const add_friend = async (req, res) => {
    const { id_friend_sender, id_friend_receiver } = req.body;
    const sql = 'INSERT INTO FRIEND (id_friend_sender, id_friend_receiver) VALUES (?, ?)';
    const values = [id_friend_sender, id_friend_receiver];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de l'ajout de l'ami" });
        }
        res.status(200).json({ data: result, message: "Ajout avec succès" });
    });
};

// Supprimer un ami
const delete_friend = async (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM FRIEND WHERE id_friend_sender = ? OR id_friend_receiver = ?';

    connexion.query(sql, [id, id], (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la suppression de l'ami" });
        }
        res.status(200).json({ data: result, message: "Supprimé avec succès" });
    });
};

// Mettre à jour un ami
const update_friend = async (req, res) => {
    const { id_friend_sender, id_friend_receiver } = req.body;
    const sql = 'UPDATE FRIEND SET id_friend_sender = ?, id_friend_receiver = ? WHERE id_friend_sender = ? AND id_friend_receiver = ?';
    const { id } = req.params;
    const values = [id_friend_sender, id_friend_receiver, id, id];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la modification de l'ami" });
        }
        res.status(200).json({ data: result, message: "Modifié avec succès" });
    });
};

// Obtenir tous les amis
const get_all_friend = async (req, res) => {
    const sql = 'SELECT * FROM FRIEND';

    connexion.query(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection des amis" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

// Obtenir un ami par son ID
const get_friend = async (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM FRIEND WHERE id_friend_sender = ? OR id_friend_receiver = ?';

    connexion.query(sql, [id, id], (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection de l'ami" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

module.exports = {
    add_friend,
    delete_friend,
    update_friend,
    get_all_friend,
    get_friend
};
