const connexion = require("../utils/db");

// Ajouter une publication
const add_publication = async (req, res) => {
    const { textarea_publication, id_user, type } = req.body;
    const sql = 'INSERT INTO PUBLICATION (textarea_publication, id_user , type_publication) VALUES (?, ?, ?)';
    const values = [textarea_publication, id_user, type];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de l'ajout de la publication" });
        }
        res.status(200).json({ data: result, message: "Ajout avec succès" });
    });
};

// Supprimer une publication par son ID
const delete_publication = async (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM PUBLICATION WHERE id_publication = ?';

    connexion.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la suppression de la publication" });
        }
        res.status(200).json({ data: result, message: "Supprimé avec succès" });
    });
};

// Mettre à jour une publication
const update_publication = async (req, res) => {
    const { id_publication } = req.params;
    const { textarea_publication, id_user, type } = req.body;
    const sql = 'UPDATE PUBLICATION SET textarea_publication = ?, id_user = ? , type_publication = ? WHERE id_publication = ?';
    const values = [textarea_publication, id_user, type, id_publication];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la modification de la publication" });
        }
        res.status(200).json({ data: result, message: "Modifié avec succès" });
    });
};

// Obtenir toutes les publications
const get_all_publication = async (req, res) => {
    const sql = 'SELECT * FROM PUBLICATION';

    connexion.query(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection des publications" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

// Obtenir une publication par son ID
const get_publication = async (req, res) => {
    const { id_publication } = req.params;
    const sql = 'SELECT * FROM PUBLICATION WHERE id_publication = ?';

    connexion.query(sql, [id_publication], (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection de la publication" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

module.exports = {
    add_publication,
    delete_publication,
    update_publication,
    get_all_publication,
    get_publication
};
