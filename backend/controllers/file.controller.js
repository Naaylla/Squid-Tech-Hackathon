const multer = require('multer');
const path = require('path');
const fs = require('fs');
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
    const { id_file } = req.params;
    const sql = 'SELECT * FROM FILE WHERE id_file = ?';

    connexion.query(sql, [id_file], (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection du fichier" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};












const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = './uploads';
        fs.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const fileName = uuidv4() + path.extname(file.originalname);
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage });

const uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }

    const { description_file } = req.body;
    const { filename, path: filePath, size } = req.file;

    const sql = 'INSERT INTO file (description_file, filename, filepath, size_file) VALUES (?, ?, ?, ?)';
    const values = [description_file, filename, filePath, size];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de l\'enregistrement du fichier dans la base de données.', error: err });
        }
        res.status(200).json({ message: 'Fichier enregistré avec succès.', file: { description_file, filename, filepath: filePath, size } });
    });
};









module.exports = {
    add_file,
    delete_file,
    update_file,
    get_all_file,
    get_file
};
