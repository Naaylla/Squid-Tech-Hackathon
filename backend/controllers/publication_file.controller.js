const connexion = require("../utils/db");

// Ajouter un fichier à une publication
const add_publication_file = async (req, res) => {
    const { id_file, id_publication } = req.body;
    const sql = 'INSERT INTO PUBLICATION_FILE (id_file, id_publication) VALUES (?, ?)';
    const values = [id_file, id_publication];

    connexion.query(sql, values, (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de l'ajout du fichier à la publication" });
        }
        res.status(200).json({ data: rows, message: "Ajout avec succès" });
    });
};

// Supprimer un fichier d'une publication
const delete_publication_file = async (req, res) => {
    const { id_file, id_publication } = req.params;
    const sql = 'DELETE FROM PUBLICATION_FILE WHERE id_file = ? AND id_publication = ?';

    connexion.query(sql, [id_file, id_publication], (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la suppression du fichier de la publication" });
        }
        res.status(200).json({ data: rows, message: "Supprimé avec succès" });
    });
};

// Mettre à jour un fichier d'une publication
const update_publication_file = async (req, res) => {
    const { id_file, id_publication } = req.params;
    const { new_id_file, new_id_publication } = req.body;
    const sql = 'UPDATE PUBLICATION_FILE SET id_file = ?, id_publication = ? WHERE id_file = ? AND id_publication = ?';
    const values = [new_id_file, new_id_publication, id_file, id_publication];

    connexion.query(sql, values, (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la modification du fichier de la publication" });
        }
        res.status(200).json({ data: rows, message: "Modifié avec succès" });
    });
};

// Obtenir tous les fichiers de publication
const get_all_publication_file = async (req, res) => {
    const sql = 'SELECT * FROM PUBLICATION_FILE';

    connexion.query(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection des fichiers de publication" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

// Obtenir un fichier de publication par son ID
const get_publication_file = async (req, res) => {
    const { id_file, id_publication } = req.params;
    const sql = 'SELECT * FROM PUBLICATION_FILE WHERE id_file = ? AND id_publication = ?';

    connexion.query(sql, [id_file, id_publication], (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection du fichier de publication" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

module.exports = {
    add_publication_file,
    delete_publication_file,
    update_publication_file,
    get_all_publication_file,
    get_publication_file
};
