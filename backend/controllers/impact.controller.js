const connexion = require("../utils/db");

// Ajouter un impact
const add_impact = async (req, res) => {
    const { id_activite, date_impact, consommation_energie, emissions_ges, utilisation_eau, gestion_dechets, autres_indicateurs } = req.body;
    const sql = 'INSERT INTO IMPACT (id_activite, date_impact, consommation_energie, emissions_ges, utilisation_eau, gestion_dechets, autres_indicateurs) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [id_activite, date_impact, consommation_energie, emissions_ges, utilisation_eau, gestion_dechets, autres_indicateurs];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de l'ajout de l'impact" });
        }
        res.status(200).json({ data: result, message: "Ajout avec succès" });
    });
};

// Supprimer un impact
const delete_impact = async (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM IMPACT WHERE id_impact = ?';

    connexion.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la suppression de l'impact" });
        }
        res.status(200).json({ data: result, message: "Supprimé avec succès" });
    });
};

// Mettre à jour un impact
const update_impact = async (req, res) => {
    const { id_impact, id_activite, date_impact, consommation_energie, emissions_ges, utilisation_eau, gestion_dechets, autres_indicateurs } = req.body;
    const sql = 'UPDATE IMPACT SET id_activite = ?, date_impact = ?, consommation_energie = ?, emissions_ges = ?, utilisation_eau = ?, gestion_dechets = ?, autres_indicateurs = ? WHERE id_impact = ?';
    const values = [id_activite, date_impact, consommation_energie, emissions_ges, utilisation_eau, gestion_dechets, autres_indicateurs, id_impact];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la modification de l'impact" });
        }
        res.status(200).json({ data: result, message: "Modifié avec succès" });
    });
};

// Obtenir tous les impacts
const get_all_impact = async (req, res) => {
    const sql = 'SELECT * FROM IMPACT';

    connexion.query(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection des impacts" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

// Obtenir un impact par son ID
const get_impact = async (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM IMPACT WHERE id_impact = ?';

    connexion.query(sql, [id], (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection de l'impact" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

module.exports = {
    add_impact,
    delete_impact,
    update_impact,
    get_all_impact,
    get_impact
};
