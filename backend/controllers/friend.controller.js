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
    const { id_friend_sender, id_friend_receiver } = req.body;
    const sql = 'DELETE FROM FRIEND WHERE id_friend_sender = ? AND id_friend_receiver = ?';
    const values = [id_friend_sender, id_friend_receiver];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la suppression de l'ami" });
        }
        res.status(200).json({ data: result, message: "Supprimé avec succès" });
    });
};

// supprimer tout les amis




// Mettre à jour une demande d'amis pour accepeter la demande 
const update_friend = async (req, res) => {
    const { id_friend_sender, id_friend_receiver } = req.params;
    const sql = 'UPDATE FRIEND SET date_time_friend_accepted = NOW() WHERE id_friend_sender = ? AND id_friend_receiver = ?';
    const values = [id_friend_sender, id_friend_receiver];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la modification de l'ami" });
        }
        res.status(200).json({ data: result, message: "Amis ajouter" });
    });
};


// Obtenir toutes les demandes d'amis 
const get_all_friend = async (req, res) => {
    const { id_friend_sender } = req.params
    const sql = 'SELECT * FROM FRIEND where id_friend_sender = ?';
    connexion.query(sql, [id_friend_sender], (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection des amis" });
        }
        res.status(200).json({ data: rows, message: "Demande d'amis selectionner avec succès" });
    });
};


// Obtenir les demandes d'amis qui sont accepter
const get_friend_accepted_request = async (req, res) => {
    const { id_friend_sender } = req.params;
    const sql = 'SELECT * FROM FRIEND WHERE id_friend_sender = ? AND date_time_friend_accepted IS NOT NULL';
    connexion.query(sql, [id_friend_sender], (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection de l'ami" });
        }
        if (rows.length === 0) {
            return res.status(200).json({ message: "Aucune demande accepter" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

// Obtenir les demandes d'amis qui sont pas accepter
const get_friend_request = async (req, res) => {
    const { id_friend_sender } = req.params;
    const sql = 'SELECT * FROM FRIEND WHERE id_friend_sender = ? AND date_time_friend_accepted IS NULL';
    connexion.query(sql, [id_friend_sender], (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection de l'ami" });
        }
        if (rows.length === 0) {
            return res.status(200).json({ message: "Aucune demande d'amis en attente" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

module.exports = {
    add_friend,
    delete_friend,
    update_friend,
    get_all_friend,
    get_friend_accepted_request,
    get_friend_request,
};
