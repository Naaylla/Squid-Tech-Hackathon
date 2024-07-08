const connexion = require("../utils/db");

// Ajouter un fichier à un message
const add_file_message = async (req, res) => {
    const { id_file, id_message } = req.body;
    const sql = 'INSERT INTO FILE_MESSAGE (id_file, id_message) VALUES (?, ?)';
    const values = [id_file, id_message];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de l'ajout du fichier au message" });
        }
        res.status(200).json({ data: result, message: "Ajout avec succès" });
    });
};

// Supprimer un fichier d'un message
const delete_file_message = async (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM FILE_MESSAGE WHERE id_file = ?';

    connexion.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la suppression du fichier du message" });
        }
        res.status(200).json({ data: result, message: "Supprimé avec succès" });
    });
};

// Mettre à jour un fichier d'un message
const update_file_message = async (req, res) => {
    const { id } = req.params;
    const { id_file, id_message } = req.body;
    const sql = 'UPDATE FILE_MESSAGE SET id_file = ?, id_message = ? WHERE id_file = ?';
    const values = [id_file, id_message, id];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la modification du fichier du message" });
        }
        res.status(200).json({ data: result, message: "Modifié avec succès" });
    });
};

// Obtenir tous les fichiers messages
const get_all_file_message = async (req, res) => {
    const sql = 'SELECT * FROM FILE_MESSAGE';

    connexion.query(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection des fichiers messages" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

// Obtenir un fichier message par son ID
const get_file_message = async (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM FILE_MESSAGE WHERE id_file = ?';

    connexion.query(sql, [id], (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection du fichier message" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

module.exports = {
    add_file_message,
    delete_file_message,
    update_file_message,
    get_all_file_message,
    get_file_message
};
