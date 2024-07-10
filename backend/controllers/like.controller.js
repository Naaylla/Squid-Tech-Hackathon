const connexion = require("../utils/db");

// Ajouter un like
const add_like = async (req, res) => {
    const { id_user } = req.body;
    const sql = 'INSERT INTO `LIKE` (id_user) VALUES (?)';
    const values = [id_user];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de l'ajout du like" });
        }
        res.status(200).json({ data: result, message: "Ajout avec succès" });
    });
};

// Supprimer un like
const delete_like = async (req, res) => {
    const { id_like } = req.params;
    const sql = 'DELETE FROM `LIKE` WHERE id_like = ?';

    connexion.query(sql, [id_like], (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la suppression du like" });
        }
        res.status(200).json({ data: result, message: "Supprimé avec succès" });
    });
};

// Mettre à jour un like
const update_like = async (req, res) => {
    const { id_like } = req.params;
    const { id_user } = req.body;
    const sql = 'UPDATE `LIKE` SET id_user = ? WHERE id_like = ?';
    const values = [id_user, id_like];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la modification du like" });
        }
        res.status(200).json({ data: result, message: "Modifié avec succès" });
    });
};

// Obtenir tous les likes
const get_all_like = async (req, res) => {
    const sql = 'SELECT * FROM `LIKE`';

    connexion.query(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection des likes" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

// Obtenir un like par son ID
const get_like = async (req, res) => {
    const { id_like } = req.params;
    const sql = 'SELECT * FROM `LIKE` WHERE id_like = ?';

    connexion.query(sql, [id_like], (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection du like" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

module.exports = {
    add_like,
    delete_like,
    update_like,
    get_all_like,
    get_like
};
