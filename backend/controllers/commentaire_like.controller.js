const connexion = require("../utils/db");

// Ajouter un like à un commentaire
const add_commentaire_like = async (req, res) => {
    const { id_commentaire, id_like } = req.body; // Assurez-vous que le like est bien géré dans votre logique
    const sql = 'INSERT INTO COMMENTAIRE_LIKE (id_commentaire, id_like) VALUES (?, ?)';
    const values = [id_commentaire, id_like];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de l'ajout" });
        }
        res.status(200).json({ data: result, message: "Ajouté avec succès" });
    });
};

// Supprimer un like d'un commentaire
const delete_commentaire_like = async (req, res) => {
    const { id_commentaire, id_like } = req.params;
    const sql = 'DELETE FROM COMMENTAIRE_LIKE WHERE id_commentaire = ? AND id_like = ?';

    connexion.query(sql, [id_commentaire, id_like], (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la suppression" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Aucune entrée trouvée pour cet identifiant" });
        }
        res.status(200).json({ data: result, message: "Supprimé avec succès" });
    });
};

// Mettre à jour un like d'un commentaire
const update_commentaire_like = async (req, res) => {
    const { id_commentaire, id_like } = req.params;
    const { new_id_commentaire, new_id_like } = req.body;
    const sql = 'UPDATE COMMENTAIRE_LIKE SET id_commentaire = ?, id_like = ? WHERE id_commentaire = ? AND id_like = ?';
    const values = [new_id_commentaire, new_id_like, id_commentaire, id_like];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la modification" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Aucune entrée trouvée pour cet identifiant" });
        }
        res.status(200).json({ data: result, message: "Modifié avec succès" });
    });
};

// Obtenir tous les likes des commentaires
const get_all_commentaire_like = async (req, res) => {
    const sql = 'SELECT * FROM COMMENTAIRE_LIKE';

    connexion.query(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

// Obtenir les likes d'un commentaire par son ID
const get_commentaire_like = async (req, res) => {
    const { id_commentaire } = req.params;
    const sql = 'SELECT * FROM COMMENTAIRE_LIKE WHERE id_commentaire = ? AND id_like = ?';

    connexion.query(sql, [id_commentaire, id_like], (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection" });
        }
        if (rows.length === 0) {
            return res.status(404).json({ message: "Aucune entrée trouvée pour cet identifiant" });
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
