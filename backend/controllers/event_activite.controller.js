const connexion = require("../utils/db");

const connexion = require("../utils/db");

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


const get_all_event_activite = async (req, res) => {
    const sql = 'SELECT * FROM EVENT_ACTIVITE';

    connexion.query(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection des événements de l'activité" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};


const get_event_activite = async (req, res) => {
    const { id_event, id_activite } = req.params;
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
