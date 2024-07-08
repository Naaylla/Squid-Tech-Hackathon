const connexion = require("../utils/db");

// Ajouter un fichier
const add_file = async (req, res) => {
    const { description_file, filename, filepath, filepath_local } = req.body;
    const sql = 'INSERT INTO FILE (description_file, filename, filepath, filepath_local) VALUES (?, ?, ?, ?)';
    const values = [description_file, filename, filepath, filepath_local];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de l'ajout du fichier" });
        }
        res.status(200).json({ data: result, message: "Ajout avec succès" });
    });
};

// Supprimer un fichier
const delete_file = async (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM FILE WHERE id_file = ?';

    connexion.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la suppression du fichier" });
        }
        res.status(200).json({ data: result, message: "Supprimé avec succès" });
    });
};

// Mettre à jour un fichier
const update_file = async (req, res) => {
    const { id } = req.params;
    const { description_file, filename, filepath, filepath_local } = req.body;
    const sql = 'UPDATE FILE SET description_file = ?, filename = ?, filepath = ?, filepath_local = ? WHERE id_file = ?';
    const values = [description_file, filename, filepath, filepath_local, id];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la modification du fichier" });
        }
        res.status(200).json({ data: result, message: "Modifié avec succès" });
    });
};

// Obtenir tous les fichiers
const get_all_file = async (req, res) => {
    const sql = 'SELECT * FROM FILE';

    connexion.query(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection des fichiers" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

// Obtenir un fichier par son ID
const get_file = async (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM FILE WHERE id_file = ?';

    connexion.query(sql, [id], (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection du fichier" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

module.exports = {
    add_file,
    delete_file,
    update_file,
    get_all_file,
    get_file
};
