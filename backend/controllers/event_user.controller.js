const connexion = require("../utils/db");

// Ajouter un utilisateur à un événement
const add_event_user = async (req, res) => {
    const { id_event, id_user } = req.body;
    const sql = 'INSERT INTO EVENT_USER (id_event, id_user) VALUES (?, ?)';
    const values = [id_event, id_user];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de l'ajout de l'utilisateur à l'événement" });
        }
        res.status(200).json({ data: result, message: "Ajout avec succès" });
    });
};

// Supprimer un utilisateur d'un événement
const delete_event_user = async (req, res) => {
    const { id_event, id_user } = req.params;
    const sql = 'DELETE FROM EVENT_USER WHERE id_event = ? AND id_user = ?';

    connexion.query(sql, [id_event, id_user], (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la suppression de l'utilisateur de l'événement" });
        }
        res.status(200).json({ data: result, message: "Supprimé avec succès" });
    });
};

// Mettre à jour les détails d'un utilisateur dans un événement
const update_event_user = async (req, res) => {
    const { id_event, id_user } = req.params;
    const { /* ajoutez ici les champs à mettre à jour si nécessaire */ } = req.body;
    const sql = 'UPDATE EVENT_USER SET /* listez les champs à mettre à jour ici */ WHERE id_event = ? AND id_user = ?';
    const values = [/* listez les valeurs correspondantes ici */, id_event, id_user];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la modification de l'utilisateur de l'événement" });
        }
        res.status(200).json({ data: result, message: "Modifié avec succès" });
    });
};

// Obtenir tous les utilisateurs associés à tous les événements
const get_all_event_user = async (req, res) => {
    const sql = 'SELECT * FROM EVENT_USER';

    connexion.query(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection des utilisateurs de l'événement" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

// Obtenir un utilisateur spécifique dans un événement par son ID
const get_event_user = async (req, res) => {
    const { id_event } = req.params;
    const sql = 'SELECT * FROM EVENT_USER WHERE id_event = ? AND id_user = ?';

    connexion.query(sql, [id_event, id_user], (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection de l'utilisateur de l'événement" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

module.exports = {
    add_event_user,
    delete_event_user,
    update_event_user,
    get_all_event_user,
    get_event_user
};
