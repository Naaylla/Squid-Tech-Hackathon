const connexion = require("../utils/db");

const add_event = async (req, res) => {
    const { id_user_creator, date_time_debut_event, date_time_fin_event, title_event, status_event, max_user } = req.body;
    const sql = 'INSERT INTO EVENT (id_user_creator, date_time_debut_event, date_time_fin_event, title_event, status_event, max_user) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [id_user_creator, date_time_debut_event, date_time_fin_event, title_event, status_event, max_user];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de l'ajout de l'événement" });
        }
        res.status(200).json({ data: result, message: "Ajout avec succès" });
    });
};



const delete_event = async (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM EVENT WHERE id_event = ?';

    connexion.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la suppression de l'événement" });
        }
        res.status(200).json({ data: result, message: "Supprimé avec succès" });
    });
};



const update_event = async (req, res) => {
    const { id } = req.params;
    const { id_user_creator, date_time_debut_event, date_time_fin_event, title_event, status_event, max_user } = req.body;
    const sql = 'UPDATE EVENT SET id_user_creator = ?, date_time_debut_event = ?, date_time_fin_event = ?, title_event = ?, status_event = ?, max_user = ? WHERE id_event = ?';
    const values = [id_user_creator, date_time_debut_event, date_time_fin_event, title_event, status_event, max_user, id];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la modification de l'événement" });
        }
        res.status(200).json({ data: result, message: "Modifié avec succès" });
    });
};

const get_all_event = async (req, res) => {
    const sql = 'SELECT * FROM EVENT';

    connexion.query(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection des événements" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};


const get_event = async (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM EVENT WHERE id_event = ?';

    connexion.query(sql, [id], (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection de l'événement" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};


module.exports = {
    add_event,
    delete_event,
    update_event,
    get_all_event,
    get_event
};
