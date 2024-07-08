const connexion = require("../utils/db");

// Ajouter un like à une publication
const add_publication_like = async (req, res) => {
    const { id_publication, id_like } = req.body;
    const sql = 'INSERT INTO PUBLICATION_LIKE (id_publication, id_like) VALUES (?, ?)';
    const values = [id_publication, id_like];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de l'ajout du like à la publication" });
        }
        res.status(200).json({ data: result, message: "Ajout avec succès" });
    });
};

// Supprimer un like d'une publication
const delete_publication_like = async (req, res) => {
    const { id_publication, id_like } = req.params;
    const sql = 'DELETE FROM PUBLICATION_LIKE WHERE id_publication = ? AND id_like = ?';

    connexion.query(sql, [id_publication, id_like], (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la suppression du like de la publication" });
        }
        res.status(200).json({ data: result, message: "Supprimé avec succès" });
    });
};

// Mettre à jour un like d'une publication
const update_publication_like = async (req, res) => {
    const { id_publication, id_like } = req.body;
    const sql = 'UPDATE PUBLICATION_LIKE SET id_like = ? WHERE id_publication = ?';
    const values = [id_like, id_publication];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la modification du like de la publication" });
        }
        res.status(200).json({ data: result, message: "Modifié avec succès" });
    });
};

// Obtenir tous les likes de toutes les publications
const get_all_publication_like = async (req, res) => {
    const sql = 'SELECT * FROM PUBLICATION_LIKE';

    connexion.query(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection des likes de publication" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

// Obtenir les likes d'une publication par ID de publication
const get_publication_like = async (req, res) => {
    const { id_publication } = req.params;
    const sql = 'SELECT * FROM PUBLICATION_LIKE WHERE id_publication = ?';

    connexion.query(sql, [id_publication], (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection des likes de publication" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

module.exports = {
    add_publication_like,
    delete_publication_like,
    update_publication_like,
    get_all_publication_like,
    get_publication_like
};
