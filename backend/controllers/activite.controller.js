const connexion = require("../utils/db");

// Ajouter une activité
const add_activite = async (req, res) => {
    const { description_activite, date_debut_activite, heure_debut_activite } = req.body;
    const sql = 'INSERT INTO ACTIVITE (description_activite, date_debut_activite, heure_debut_activite) VALUES (?, ?, ?)';
    const values = [description_activite, date_debut_activite, heure_debut_activite];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de l'ajout" });
        }
        res.status(200).json({ data: result, message: "Ajout avec succès" });
    });
};


// Supprimer une activité
const delete_activite = async (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM ACTIVITE WHERE id_activite = ?';

    connexion.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la suppression" });
        }
        res.status(200).json({ data: result, message: "Supprimé avec succès" });
    });
};

// Mettre à jour une activité
const update_activite = async (req, res) => {
    const { id } = req.params;
    const { description_activite, date_debut_activite, heure_debut_activite } = req.body;
    const sql = 'UPDATE ACTIVITE SET description_activite = ?, date_debut_activite = ?, heure_debut_activite = ? WHERE id_activite = ?';
    const values = [description_activite, date_debut_activite, heure_debut_activite, id];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la modification" });
        }
        res.status(200).json({ data: result, message: "Modifié avec succès" });
    });
};


// Obtenir toutes les activités
const get_all_activite = async (req, res) => {
    const sql = 'SELECT * FROM ACTIVITE';

    connexion.query(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

// Obtenir une activité par son ID
const get_activite = async (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM ACTIVITE WHERE id_activite = ?';

    connexion.query(sql, [id], (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

module.exports = {
    add_activite,
    delete_activite,
    update_activite,
    get_all_activite,
    get_activite
};
