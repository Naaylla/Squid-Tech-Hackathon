const connexion = require("../utils/db");

// Ajouter un événement à une activité
const add_event_activite = async (req, res) => {
    const { id_event, id_activite, time_activite } = req.body;
    const sql = 'INSERT INTO EVENT_ACTIVITE (id_event, id_activite, time_activite) VALUES (?, ?, ?)';
    const values = [id_event, id_activite, time_activite];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de l'ajout de l'événement à l'activité" });
        }
        res.status(200).json({ data: result, message: "Ajout avec succès" });
    });
};

// Supprimer un événement d'une activité
const delete_event_activite = async (req, res) => {
    const { id_event, id_activite } = req.params;
    const sql = 'DELETE FROM EVENT_ACTIVITE WHERE id_event = ? AND id_activite = ?';

    connexion.query(sql, [id_event, id_activite], (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la suppression de l'événement de l'activité" });
        }
        res.status(200).json({ data: result, message: "Supprimé avec succès" });
    });
};

// Mettre à jour l'heure d'un événement dans une activité
const update_event_activite = async (req, res) => {
    const { id_event, id_activite } = req.params;
    const { time_activite } = req.body;
    const sql = 'UPDATE EVENT_ACTIVITE SET time_activite = ? WHERE id_event = ? AND id_activite = ?';
    const values = [time_activite, id_event, id_activite];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la modification de l'événement de l'activité" });
        }
        res.status(200).json({ data: result, message: "Modifié avec succès" });
    });
};

// Obtenir tous les événements associés à une activité
const get_all_event_activite = async (req, res) => {
    const sql = 'SELECT * FROM EVENT_ACTIVITE';

    connexion.query(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection des événements de l'activité" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

// Obtenir les événement  associé à une activité par son ID
const get_event_activite = async (req, res) => {
    const { id_event } = req.params;
    const sql = 'SELECT * FROM EVENT_ACTIVITE WHERE id_event = ? AND id_activite = ?';

    connexion.query(sql, [id_event, id_activite], (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection de l'événement de l'activité" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

module.exports = {
    add_event_activite,
    delete_event_activite,
    update_event_activite,
    get_all_event_activite,
    get_event_activite
};
