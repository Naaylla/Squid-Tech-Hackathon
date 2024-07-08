const connexion = require("../utils/db");

// Ajouter un like à un commentaire
const add_commentaire_like = async (req, res) => {
    const { id_commentaire, id_user } = req.body;
    const sql = 'INSERT INTO COMMENTAIRE_LIKE (id_commentaire, id_user) VALUES (?, ?)';
    const values = [id_commentaire, id_user];

    connexion.query(sql, values, (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de l'ajout" });
        }
        res.status(200).json({ data: rows, message: "Ajout avec succès" });
    });
};

// Supprimer un like d'un commentaire
const delete_commentaire_like = async (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM COMMENTAIRE_LIKE WHERE id_commentaire_like = ?';

    connexion.query(sql, [id], (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la suppression" });
        }
        res.status(200).json({ data: rows, message: "Supprimé avec succès" });
    });
};

// Mettre à jour un like d'un commentaire
const update_commentaire_like = async (req, res) => {
    const { id } = req.params;
    const { id_commentaire, id_user } = req.body;
    const sql = 'UPDATE COMMENTAIRE_LIKE SET id_commentaire = ?, id_user = ? WHERE id_commentaire = ?';
    const values = [id_commentaire, id_user, id];

    connexion.query(sql, values, (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la modification" });
        }
        res.status(200).json({ data: rows, message: "Modifié avec succès" });
    });
};

// Obtenir tous les likes de commentaires
const get_all_commentaire_like = async (req, res) => {
    const sql = 'SELECT * FROM COMMENTAIRE_LIKE';

    connexion.query(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

// Obtenir un like de commentaire par son ID
const get_commentaire_like = async (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM COMMENTAIRE_LIKE WHERE id_commentaire = ?';

    connexion.query(sql, [id], (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

module.exports = {
    add_commentaire_like,
    delete_commentaire_like,
    update_commentaire_like,
    get_all_commentaire_like,
    get_commentaire_like
};
